import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get(
  '/category/:id',
  'controller link with category id (lists all items in the category)'
);

router.get(
  '/item/:id',
  'controller link with item id (shows details for the specific item)'
);

// categories
router.get('/category/create', 'controller link with form to create category');
router.post('/category/create', 'controller link that creates category');

router.get(
  '/category/:id/update',
  'controller link with form to updates category'
);
router.post('/category/:id/update', 'controller link that updates category');

router.get(
  '/category/:id/delete',
  'controller link with form to create category'
);
router.post('/category/:id/delete', 'controller link that creates category');

// items
router.get('/item/create', 'controller link with form to create item');
router.post('/item/create', 'controller link that creates item');

router.get('/item/:id/update', 'controller link with form to updates item');
router.post('/item/:id/update', 'controller link that updates item');

router.get('/item/:id/delete', 'controller link with form to delete item');
router.post('/item/:id/delete', 'controller link that deletes item');

export default router;
