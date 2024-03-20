
const Product = require('../models/productModel');
const ProductQuery = require('../models/productQuery');

const productController = {
    addProduct: async (req, res) => {
        try {
            const result = await Product.addProduct(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ success: false, error: 'Failed to add product' });
        }
    }
,





getAllProducts: async (req, res) => {
        try {
            
            // Call the model function to retrieve customer orders
            const products = await ProductQuery.getAllProducts();

            // Check if products are retrieved successfully
            if (products && products.length > 0) {
                // Send the products as JSON response
                res.status(200).json({ success: true, products });
            } else {
                res.status(404).json({ success: false, error: 'No product found' });
            }
        } catch (error) {
            console.error('Error retrieving customer product:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    },


getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            // Call the model function to retrieve customer orders
            const products = await ProductQuery.getProductById(id);

            // Check if products are retrieved successfully
            if (products && products.length > 0) {
                // Send the products as JSON response
                res.status(200).json( products );
            } else {
                res.status(404).json({ success: false, error: 'No product found' });
            }
        } catch (error) {
            console.error('Error retrieving customer product:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }





};




module.exports = productController;
