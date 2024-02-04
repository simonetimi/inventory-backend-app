import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import Item from '../models/Item.js';

export const item_detail = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate('category').exec();
  res.render('item_detail', {
    title: 'Item details',
    item: item,
  });
});
