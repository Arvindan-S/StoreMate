const Store = require('../models/store');

// @desc   Create a new store
// @route  POST /api/stores
const createStore = async (req, res) => {
  try {
    const { name, owner, location, contactEmail, contactPhone } = req.body;

    if (!name || !owner || !location || !contactEmail || !contactPhone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const store = new Store({
      name,
      owner,
      location,
      contactEmail,
      contactPhone,
    });

    await store.save();

    res.status(201).json({ message: 'Store created successfully', store });
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createStore };
