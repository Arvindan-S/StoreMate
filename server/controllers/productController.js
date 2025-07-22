const Product = require('../models/product');

const createProduct = async (req, res) => {
  try {
    const { storeId, name, price, stock, unit } = req.body;

    if (!storeId || !name || !price || !stock || !unit) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const product = new Product({ storeId, name, price, stock, unit });
    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createProduct };
