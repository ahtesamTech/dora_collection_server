const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
var corsOptions = {
    origin: ['https://doracollection.xyz', 'https://dora-collection-bd.web.app'],
    optionsSuccessStatus: 200,
    credentials: true
  }
app.use(cors(corsOptions)); 
app.use(express.json()); 
// Middleware


// Use order routes
app.use('/api/orders', orderRoutes);

// Use the orders route
app.use('/api/view-order', orderRoutes);

// Use the product router
app.use('/api/product', productRoutes);

// auth route

app.use('/api/auth', authRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
