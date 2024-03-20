const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Route to save order
router.post('/', orderController.saveOrder);

router.get('/orders', orderController.getCustomerOrders);

module.exports = router;


