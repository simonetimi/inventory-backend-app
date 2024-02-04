import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import Item from '../models/Item.js';

export const item_details = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate('category').exec();
  res.render('item_details', {
    title: 'Item details',
    item: item,
  });
});

export const item_create_get = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 }).exec();
  res.render('item_form', {
    title: 'Create item',
    categories: categories,
  });
});

export const item_create_post = [
  asyncHandler(async (req, res, next) => {
    // Process request after validation and sanitization.
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });
    await item.save();
    res.redirect(item.url);
  }),
];

export const item_update_get = asyncHandler(async (req, res, next) => {
  // Get book, authors and genres for form.

  const [item, categories] = await Promise.all([
    Item.findById(req.params.id).populate('category').exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  if (item === null) {
    // No results.
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  res.render('item_form', {
    title: 'Update Item',
    item: item,
    categories: categories,
  });
});

export const item_update_post = [
  asyncHandler(async (req, res, next) => {
    // Process request after validation and sanitization.
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });
    await item.save();
    res.redirect(item.url);
  }),
];

export const item_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const item = await Item.findById(req.params.id).populate('category').exec();

  if (item === null) {
    // No results.
    res.redirect('/category/items');
  }

  res.render('item_delete', {
    title: 'Delete Item',
    item: item,
  });
});

// Handle book delete on POST.
export const item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.body.itemid);
  res.redirect('/category/items');
});
