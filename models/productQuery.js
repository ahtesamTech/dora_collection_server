const db = require('../config');

const ProductQuery = {
    getAllProducts: async () => {
        try {
            // Query to fetch customer orders from the database
            const query = `
                SELECT 
                    p.id,
                    p.title,
                    p.description,
                    p.price,
                    p.discount_percentage,
                    p.rating,
                    p.stock,
                    p.brand,
                    p.category,
                    p.thumbnail,
                    p.video,
                    pi.img_id,
                    pi.product_id,
                    pi.image_url
                FROM
                    products p
                        JOIN
                    product_images pi ON p.id = pi.product_id
                    
            `;

            // Execute the query
            const result = await new Promise((resolve, reject) => {
                db.query(query, (err, res)=>{
            
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })

            // Initialize an empty object to store orders grouped by customer
            const productImage = {};

            // Process each row in the query result
            result.forEach(row => {
                // Extract customer details from the row
                const { id, title, description, price, discount_percentage, rating,stock, brand, category, thumbnail, video } = row;

                // Create or update the customer's entry in the customerOrders object
                if (!productImage[id]) {
                    productImage[id] = {
                        id,
                        title,
                        description,
                        price,
                        discount_percentage,
                        rating,
                        stock,
                        brand,
                        category,
                        thumbnail,
                        video,
                        images: []
                    };
                }

                // Extract order details from the row
                const { product_id, image_url } = row;

                // Add the order details to the customer's orders array
                productImage[id].images.push( image_url );
            });

            // Convert the customerOrders object into an array of orders
            const products = Object.values(productImage);

            // Return the formatted orders
            return products;
        } catch (error) {
            console.error('Error retrieving customer orders:', error);
            throw error;
        }
    },


    getProductById: async (productId) => {
        try {
            // Query to fetch customer orders from the database
            const query = `
                SELECT 
                    p.id,
                    p.title,
                    p.description,
                    p.price,
                    p.discount_percentage,
                    p.rating,
                    p.stock,
                    p.brand,
                    p.category,
                    p.thumbnail,
                    p.video,
                    pi.img_id,
                    pi.product_id,
                    pi.image_url
                FROM
                    products p
                        JOIN
                    product_images pi ON p.id = pi.product_id
                    WHERE
                    p.id = ?
            `;

            // Execute the query
            const result = await new Promise((resolve, reject) => {
                db.query(query,[productId], (err, res)=>{
            
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })

            // Initialize an empty object to store orders grouped by customer
            const productImage = {};

            // Process each row in the query result
            result.forEach(row => {
                // Extract customer details from the row
                const { id, title, description, price, discount_percentage, rating,stock, brand, category, thumbnail, video } = row;

               

                    productImage[id] = {
                        id,
                        title,
                        description,
                        price,
                        discount_percentage,
                        rating,
                        stock,
                        brand,
                        category,
                        thumbnail,
                        video,
                        images: []
                    };

                      // Initialize the product object with extracted details
     

                // Extract order details from the row
                const { image_url } = row;

                // Add the order details to the customer's orders array
                productImage[id].images.push( image_url );
            });

            
            // Convert the customerOrders object into an array of orders
            console.log("product img",productImage);
            // const products = Object.values(productImage);
            const products = Object.values(productImage);

            // Return the formatted orders
            console.log("product", products);
            return products;
        } catch (error) {
            console.error('Error retrieving customer orders:', error);
            throw error;
        }
    }
};

module.exports = ProductQuery;
