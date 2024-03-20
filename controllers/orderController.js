const Order = require('../models/orderModel');
const OrderQuery = require('../models/orderQuery');

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
    }

};


module.exports = orderController;
