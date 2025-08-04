const express = require('express');
const router = express.Router();
const { createStore, getStores, getMyStores, deleteStore } = require('../controllers/storeController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Get only the logged-in admin's stores
router.get('/mine', authMiddleware, getMyStores);

// ✅ Delete a store (only by owner)
router.delete('/:id', authMiddleware, deleteStore);

// ✅ Create Store (only logged-in users)
router.post('/', authMiddleware, createStore);

// ✅ Get all Stores (public)
router.get('/', getStores);

module.exports = router;
