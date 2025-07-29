const Product = require('../models/product');

// ✅ Add Product
const addProduct = async (req, res) => {
    try {
        const { name, price, stock, unit, storeId } = req.body;

        if (!name || !price || !stock || !unit || !storeId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = new Product({
            name,
            price,
            stock,
            unit,
            storeId
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// ✅ Get all Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('storeId', 'name location');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

module.exports = { addProduct, getProducts };
