const express = require('express');
const router = express.Router();
const { createStore, getStores } = require('../controllers/storeController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Create Store (only logged-in users)
router.post('/', authMiddleware, createStore);

// ✅ Get all Stores (public)
router.get('/', getStores);

module.exports = router;
