const express = require('express');
const router = express.Router();
const stallsController = require('../controllers/stallController');
const userController = require('../controllers/userController');
const foodController = require('../controllers/foodController');
const trayController = require('../controllers/trayController');
const orderController = require('../controllers/orderController');
const orderItemsController = require('../controllers/orderItemsController');
const bookmarkController = require('../controllers/bookmarkController');
const categoryController = require('../controllers/categoryController');
const transactionController = require('../controllers/transactionController');
const foodItemCategoryController = require('../controllers/foodItemCategoryController');

//Stalls
router.get('/stalls', stallsController.getAllStalls);
router.get('/stalls/:id', stallsController.getStallById);
router.get('/stalls/:id/orders', orderController.getOrdersForStall);
router.post('/stalls', stallsController.createStall);
router.put('/stalls/:id', stallsController.updateStall);
router.delete('/stalls/:id', stallsController.deleteStall);
router.get('/total-stalls', stallsController.getTotalStalls);
router.get('/active-stalls', stallsController.getActiveStalls);

//Users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/total-users', userController.getTotalUsers);

//Login
router.post('/login', userController.loginUser);

//Food Items
router.get('/foods', foodController.getAllFoods);
router.get('/foods/:id', foodController.getFoodById);
router.get('/foods/:id/categories', foodController.getFoodsByCategory); // Get foods by category
router.get('/foods/:id/stalls', foodController.getFoodsByStallId); // Get foods by category
router.get('/foods/:id/trays', foodController.getTrayFoodsByUserId); // Get foods by category
router.post('/foods', foodController.createFood);
router.put('/foods/:id', foodController.updateFood);
router.delete('/foods/:id', foodController.deleteFood);

//Trays
router.get('/trays', trayController.getAllTrays);
router.get('/trays/:id', trayController.getTrayByUserId);
router.post('/trays', trayController.createTray);
router.put('/trays/:id', trayController.updateTray);
router.delete('/trays/:id', trayController.deleteTray);
router.delete('/trays', trayController.deleteTrayIds);

//Orders 
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.get('/users/:id/orders', orderController.getOrderByUserId);
router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrderStatus);
router.delete('/orders/:id', orderController.deleteOrder);

//Order_items (one to many relationship)
router.get('/all-order-items', orderItemsController.getAllOrderItems);
router.get('/orders/:id/items', orderItemsController.getOrderItemById);
router.post('/orders/:id/items', orderItemsController.createOrderItem);
router.delete('/orders/:id/items', orderItemsController.deleteOrderItem);
 
//Bookmarks
router.get('/bookmarks', bookmarkController.getAllBookmarks);
router.get('/bookmarks/:id', bookmarkController.getBookmarkByUserId);
router.post('/bookmarks', bookmarkController.createBookmark);
router.delete('/bookmarks/:id', bookmarkController.deleteBookmark);
 
//Categories
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategoryName);
router.delete('/categories/:id', categoryController.deleteCategory);
//Associate Categories in Food Items 
router.post('/foods/:id/categories', foodItemCategoryController.addCategoriesToFoodItem);

//Transactions
router.get('/transactions', transactionController.getAllTransactions);
router.get('/transactions/:id', transactionController.getTransactionByUserId);
router.post('/transactions', transactionController.createTransaction);
router.put('/transactions/:id', transactionController.updateTransactionStatus);

module.exports = router;