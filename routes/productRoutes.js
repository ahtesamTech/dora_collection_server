const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddelware');

router.post('/add-products', productController.addProduct);

router.get('/', productController.getAllProducts);

router.get('/:id?', productController.getProductById);

module.exports = router;