const express = require('express');
const cors = require("cors");
const app = express();
const port = 4000;
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderDetailRoutes = require('./routes/orderDetailRoutes');
app.use(express.json())

app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
}));

app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', commentRoutes);
app.use('/api', orderRoutes);
app.use('/api', orderDetailRoutes);

app.listen(port, () => {
    console.log('http://localhost:4000');
})