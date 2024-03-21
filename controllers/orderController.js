const Order = require('../models/orderModel');
const OrderQuery = require('../models/orderQuery');
const db = require('../config')

const orderController = {
    saveOrder: async (req, res) => {
        try {
            const result = await Order.saveOrder(req.body);
            if (result && result.success) {
                res.status(200).json({ message: 'Order saved successfully' });
            } 
        } catch (error) {
            console.error('Error saving order:', error);
            res.status(500).json({ error: 'Failed to save order' });
        }
    },



    // Controller function to handle request for fetching customer orders
    getCustomerOrders: async (req, res) => {
        try {
            // Call the model function to retrieve customer orders
            const orders = await OrderQuery.getCustomerOrders();

            // console.log('controll order', orders);

            // Check if orders are retrieved successfully
            if (orders && orders.length > 0) {
                // Send the orders as JSON response
                res.status(200).json({ success: true, orders });
            } else {
                res.status(404).json({ success: false, error: 'No orders found' });
            }
        } catch (error) {
            console.error('Error retrieving customer orders:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    },




    updateOrderStatus : (req, res) => {
        const { orderId, status } = req.body;
    
        // Update order status in the database
        db.query('UPDATE orders SET status = ? WHERE order_id = ?', [status, orderId], (error, results) => {
            if (error) {
                console.error('Error updating order status:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
    
            // Send success response
            res.json({ message: 'Order status updated successfully' });
        });
    }


};


module.exports = orderController;
