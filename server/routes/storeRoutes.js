const express = require('express');
const router = express.Router();
const { createStore } = require('../controllers/storeController');

router.post('/', createStore);

module.exports = router;
