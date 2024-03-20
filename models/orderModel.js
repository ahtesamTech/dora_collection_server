const db = require('../config'); // Assuming you have a database configuration file

const Order = {
    saveOrder: async (customerData) => {
        try {
            const { customer_name, customer_number, customer_address, customer_payment_number, delivery_charge, total_amount, customer_product } = customerData;

            // Insert customer details into Customers table
            const insertCustomerQuery = 'INSERT INTO customers (customer_name, customer_number, customer_address, customer_payment_number) VALUES (?, ?, ?, ?)';
            const customerResult = await new Promise((resolve, reject) => {
                db.query(insertCustomerQuery, [customer_name, customer_number, customer_address, customer_payment_number], (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            });

    

            const customerId = customerResult.insertId;
            // console.log(customerId);

            // Insert order details into Orders table
            const insertOrderQuery = 'INSERT INTO orders (customer_id, delivery_charge, total_amount) VALUES (?, ?, ?)';
            const orderResult = await new Promise((resolve, reject) => {
                db.query(insertOrderQuery, [customerId, delivery_charge, total_amount],(err, res)=>{
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }

                });
            });

        

            const orderId = orderResult.insertId;

            // Insert each product in the cart into Order_Details table
            for (const product of customer_product) {
                const insertOrderDetailQuery = 'INSERT INTO order_details (order_id, product_id, product_title, product_price, product_img) VALUES (?, ?, ?, ?, ?)';
                await db.query(insertOrderDetailQuery, [orderId, product.product_id, product.product_title, product.product_price, product.product_img]);
            }

            console.log('Order saved successfully!');
            return { success: true };
        } catch (error) {
            console.error('Error saving order:', error);
            return { success: false, error };
        }
    },



// // Model function to retrieve customer orders
// getCustomerOrders : async () => {
//     try {
//         // Query to fetch customer orders from the database
//         const query = `
//             SELECT 
//                 c.customer_name,
//                 c.customer_address,
//                 o.total_amount,
//                 od.product_title,
//                 od.product_price,
//                 od.product_img
//             FROM
//                 customers c
//                     JOIN
//                 orders o ON c.customer_id = o.customer_id
//                     JOIN
//                 order_details od ON o.order_id = od.order_id;
//         `;
        
//         // Execute the query
//         const [rows] = await db.query(query);

//         // Return the fetched orders
//         return rows;
//     } catch (error) {
//         console.error('Error retrieving customer orders:', error);
//         throw error;
//     }

// }

};

module.exports = Order;
