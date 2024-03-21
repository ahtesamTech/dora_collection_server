const db = require('../config');

const OrderQuery = {
    getCustomerOrders: async () => {
        try {
            // Query to fetch customer orders from the database
            const query = `
                SELECT 
                    c.customer_id,
                    c.customer_name,
                    c.customer_number,
                    c.customer_address,
                    c.customer_payment_number,
                    o.order_id,
                    o.total_amount,
                    o.delivery_charge,
                    o.order_date,
                    o.status,
                    od.order_detail_id,
                    od.product_id,
                    od.product_title,
                    od.product_price,
                    od.product_img
                FROM
                    customers c
                        JOIN
                    orders o ON c.customer_id = o.customer_id
                        JOIN
                    order_details od ON o.order_id = od.order_id;
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
            const customerOrders = {};

            // Process each row in the query result
            result.forEach(row => {
                // Extract customer details from the row
                const { customer_id, customer_name,customer_number, customer_address,customer_payment_number, order_id, total_amount,delivery_charge,status, order_date  } = row;

                // Create or update the customer's entry in the customerOrders object
                if (!customerOrders[customer_id]) {
                    customerOrders[customer_id] = {
                        customer_id,
                        customer_name,
                        customer_number,
                        customer_address,
                        customer_payment_number,
                        total_amount,
                        delivery_charge,
                        order_id,
                        status,
                        order_date,
                        orders_product: []
                    };
                }

                // Extract order details from the row
                const { order_detail_id, product_id, product_title, product_price, product_img } = row;

                // Add the order details to the customer's orders array
                customerOrders[customer_id].orders_product.push({
                    
                    order_detail_id,
                    product_id,
                    product_title,
                    product_price,
                    product_img
                });
            });

            // Convert the customerOrders object into an array of orders
            const orders = Object.values(customerOrders);

            // Return the formatted orders
            return orders;
        } catch (error) {
            console.error('Error retrieving customer orders:', error);
            throw error;
        }
    }
};

module.exports = OrderQuery;
