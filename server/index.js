const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// config
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
const storeRoutes = require('./routes/storeRoutes');
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);



// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
