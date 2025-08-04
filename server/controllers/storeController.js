const Store = require('../models/store');

// Delete a store (only by owner)
const deleteStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        if (store.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this store' });
        }
        await store.deleteOne();
        res.status(200).json({ message: 'Store deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// ✅ Create Store
const createStore = async (req, res) => {
    try {
        const { name, location, contactEmail, contactPhone } = req.body;

        if (!name || !location || !contactEmail || !contactPhone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const store = new Store({
            name,
            owner: req.user._id,
            location,
            contactEmail,
            contactPhone,
            status: 'active'
        });

        await store.save();
        res.status(201).json({ message: 'Store created successfully', store });

    } catch (error) {
        console.error('Store creation error:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
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

const getMyStores = async (req, res) => {
    try {
        const stores = await Store.find({ owner: req.user._id });
        res.status(200).json(stores);
    } catch (error) {
        console.error('Get stores error:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

module.exports = { createStore, getStores, getMyStores, deleteStore };
