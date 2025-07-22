const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userControllers');

// Store Owner Registration
router.post('/register', registerUser);

// Store Owner Login
router.post('/login', loginUser);

module.exports = router;
