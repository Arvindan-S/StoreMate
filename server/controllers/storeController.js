const Store = require('../models/store');

// ✅ Create Store
const createStore = async (req, res) => {
    try {
        const { name, location, contactEmail, contactPhone } = req.body;

        if (!name || !location || !contactEmail || !contactPhone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const store = new Store({
            name,
            owner: req.user.id, // from authMiddleware
            location,
            contactEmail,
            contactPhone
        });

        await store.save();
        res.status(201).json({ message: 'Store created successfully', store });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// ✅ Get all Stores
const getStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get stores for the logged-in user
const getMyStores = async (req, res) => {
    try {
        const stores = await Store.find({ owner: req.user.id });
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

module.exports = { createStore, getStores, getMyStores };
