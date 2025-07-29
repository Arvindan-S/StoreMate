const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Add Product (only logged-in users)
router.post('/', authMiddleware, addProduct);

// ✅ Get all Products (public)
router.get('/', getProducts);

module.exports = router;
