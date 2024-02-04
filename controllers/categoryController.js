import Category from '../models/Category.js';
import Item from '../models/Item.js';
import asyncHandler from 'express-async-handler';

// Display list of all Authors.
export const categories_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render('categories_list', {
    title: 'Categories List',
    categories: allCategories,
  });
});
