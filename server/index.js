const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
