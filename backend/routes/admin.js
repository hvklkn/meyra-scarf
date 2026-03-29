const express = require('express');
const router = express.Router();
const adminController  = require('../controllers/adminController');
const productController = require('../controllers/productController');
const orderController  = require('../controllers/orderController');
const authMiddleware   = require('../middleware/auth');

router.post('/login',    adminController.login);
router.get('/products',  authMiddleware, productController.getAllAdmin);
router.get('/orders',    authMiddleware, orderController.getAll);
router.get('/orders/:id',authMiddleware, orderController.getById);

module.exports = router;
