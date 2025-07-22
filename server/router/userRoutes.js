const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Route: Register a store owner
router.post('/register', registerUser);

// Route: Login a store owner
router.post('/login', loginUser);

module.exports = router;
