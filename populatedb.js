#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

import Item from './models/item.js';
import Category from './models/category.js';

import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const items = [];
const categories = [];

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await populateCategories();
  await populateItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function itemCreate(
  index,
  name,
  description,
  category,
  price,
  numberInStock
) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    number_in_stock: numberInStock,
  });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function categoryCreate(index, name) {
  const category = new Category({
    name: name,
  });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

// populate database
async function populateCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(0, 'Vegetables'),
    categoryCreate(1, 'Dairy'),
    categoryCreate(2, 'Meat'),
    categoryCreate(3, 'Pasta'),
  ]);
}

async function populateItems() {
  console.log('Adding items');
  await Promise.all([
    itemCreate(
      0,
      'Eggplant',
      'A versatile, pear-shaped vegetable known for its deep purple skin and creamy, absorbent flesh. Ideal for grilling, roasting, or creating hearty dishes like eggplant Parmesan. Available in various sizes, perfect for any recipe.',
      categories[0],
      1,
      10
    ),
    itemCreate(
      1,
      'Zucchini',
      "Fresh, vibrant green zucchini with a smooth, firm skin. Low in calories and high in vitamins, it's perfect for stir-fries, zoodles, or baking. Choose young, medium-sized zucchinis for the best flavor and texture.",
      categories[0],
      1.5,
      12
    ),
    itemCreate(
      2,
      'Tomato',
      'Juicy, ripe tomatoes with a rich red color and a balance of sweetness and acidity. Essential for salads, sauces, or sandwiches. Our selection includes vine-ripened and heirloom varieties to enhance any dish.',
      categories[0],
      0.8,
      20
    ),
    itemCreate(
      3,
      'Milk',
      'Fresh, creamy milk, rich in calcium and vitamins. Our milk comes from carefully selected dairy farms and is perfect for your morning cereal, coffee, or baking needs. Available in whole, skimmed, and semi-skimmed varieties.',
      categories[1],
      1,
      30
    ),
    itemCreate(
      4,
      'Parmigiano',
      'Authentic Parmigiano Reggiano, aged for over 24 months to develop its distinct nutty flavor and granular texture. An Italian classic, perfect for grating over pasta, risottos, or enjoying on its own.',
      categories[1],
      8,
      3
    ),
    itemCreate(
      5,
      'Gorgonzola',
      'A bold, Italian blue cheese with a creamy texture and a sharp, tangy flavor profile. Ideal for adding depth to sauces, salads, or paired with fruits and wines as a luxurious snack.',
      categories[1],
      5,
      5
    ),
    itemCreate(
      6,
      'Chicken Breast',
      'Premium, lean chicken breasts, skinless and boneless, known for their tenderness and versatility. Perfect for grilling, baking, or sautéing. Our chicken is sourced from farms that prioritize animal welfare.',
      categories[2],
      4,
      0
    ),
    itemCreate(
      7,
      'Penne',
      'Classic, tube-shaped pasta with ridges to capture every drop of sauce. Penne is a pantry staple, ideal for baked dishes, pasta salads, or robust tomato-based sauces.',
      categories[3],
      0.9,
      12
    ),
    itemCreate(
      8,
      'Spaghetti',
      'Long, thin strands of pasta made from high-quality durum wheat, perfect for twirling around your fork. Spaghetti is the ultimate comfort food, pairing wonderfully with everything from simple garlic and oil to rich meat sauces.',
      categories[2],
      0.9,
      11
    ),
  ]);
}
