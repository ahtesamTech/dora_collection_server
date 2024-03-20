
const db = require('../config');

const Product = {
    addProduct: async (productData) => {
        try {
            // Extract product data from the request body
            const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, video } = productData;

            // Construct the SQL query to insert the product into the database
            const insertProductQuery = `
                INSERT INTO products (title, description, price, discount_percentage, rating, stock, brand, category, thumbnail, video)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
            `;

            // Execute the SQL query to insert the product
            const result = await new Promise((resolve, reject) => {
                db.query(insertProductQuery, [title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, video], (err, res)=>{
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });

            });

            // Retrieve the auto-generated ID of the inserted product
            const productId = result.insertId;

            // Insert the product images into the database (if available)
            if (images && images.length > 0) {
                const insertImagesQuery = 'INSERT INTO product_images (product_id, image_url) VALUES ?';
                const imageValues = images.map(imageUrl => [productId, imageUrl]);
                await db.query(insertImagesQuery, [imageValues]);
            }

            return { success: true, message: 'Product added successfully' };
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }
};

module.exports = Product;
