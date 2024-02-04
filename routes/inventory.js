import express from 'express';
const router = express.Router();
import * as item_controller from '../controllers/itemController.js';
import * as category_controller from '../controllers/categoryController.js';

/* GET users listing. */
/*
router.get(
  '/category/:id',
  'controller link with category id (lists all items in the category)'
);
*/
router.get('/categories', category_controller.categories_list);
router.get('/item/create', item_controller.item_create_get);
router.post('/item/create', item_controller.item_create_post);
router.get('/item/:id/update', item_controller.item_update_get);
router.post('/item/:id/update', item_controller.item_update_post);
router.get('/item/:id/delete', item_controller.item_delete_get);
router.post('/item/:id/delete', item_controller.item_delete_post);
router.get('/item/:id', item_controller.item_details);

/*
router.get('/item/:id/update', 'controller link with form to updates item');
router.post('/item/:id/update', 'controller link that updates item');

router.get('/item/:id/delete', 'controller link with form to delete item');
router.post('/item/:id/delete', 'controller link that deletes item');

*/

/*
// categories
router.get('/category/create', 'controller link with form to create category');
router.post('/category/create', 'post');

router.get(
  '/category/:id/delete',
  'controller link with form to create category'
);
router.post('/category/:id/delete', 'controller link that creates category');
*/

export default router;
