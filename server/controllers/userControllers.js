const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a Store Owner
const registerUser = async (req, res) => {
    try {
        const { name, shopName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({
            name,
            shopName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'Store owner registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Login a Store Owner
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                shopName: user.shopName,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

module.exports = { registerUser, loginUser };
