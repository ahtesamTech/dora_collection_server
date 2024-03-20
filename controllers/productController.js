
const Product = require('../models/productModel');

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
};

module.exports = productController;
