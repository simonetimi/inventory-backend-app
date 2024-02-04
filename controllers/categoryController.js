import Category from '../models/Category.js';
import Item from '../models/Item.js';
import asyncHandler from 'express-async-handler';

export const categories_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render('categories_list', {
    title: 'Categories List',
    categories: allCategories,
  });
});

export const category_details = asyncHandler(async (req, res, next) => {
  const [category, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  res.render('category_details', {
    title: category.name,
    category: category,
    items: allItemsByCategory,
  });
});

export const category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', { title: 'Create Category' });
});

export const category_create_post = asyncHandler(async (req, res, next) => {
  const category = new Category({
    name: req.body.name,
  });
  const categoryExists = await Category.findOne({ name: req.body.name }).exec();
  if (categoryExists) {
    // exists, redirect to its detail page.
    res.redirect(categoryExists.url);
  } else {
    await category.save();
    res.redirect(category.url);
  }
});

export const category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  res.render('category_form', {
    title: 'Rename Category',
    category: category,
  });
});

export const category_update_post = [
  asyncHandler(async (req, res, next) => {
    const category = new Category({
      name: req.body.name,
    });
    const categoryExists = await Category.findOne({
      name: req.body.name,
    }).exec();
    if (categoryExists) {
      // exists, redirect to its detail page.
      res.redirect(categoryExists.url);
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

export const category_delete_get = asyncHandler(async (req, res, next) => {
  const category = new Category({
    name: req.body.name,
  });
  res.render('category_delete', {
    title: 'Delete Category',
    category: category,
    category_items: '',
  });
});

export const category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (allItemsByCategory.length > 0) {
    res.render('category_delete', {
      title: 'Delete Category',
      category: category,
      category_items: allItemsByCategory,
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/inventory/category');
  }
});
