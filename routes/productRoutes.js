const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/add-products', productController.addProduct);

module.exports = router;