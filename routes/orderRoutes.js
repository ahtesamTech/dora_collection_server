const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddelware');

const router = express.Router();

// Route to save order
router.post('/', orderController.saveOrder);

// orderRouter.js
router.get('/orders', authMiddleware.verifyToken, orderController.getCustomerOrders);

// Update order status route (PUT) with authentication middleware
router.put('/update-order-status', authMiddleware.verifyToken, orderController.updateOrderStatus);

module.exports = router;


