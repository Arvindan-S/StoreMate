const mongoose = require('mongoose');

// Define the schema for the shop owner (user)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // email should be unique
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // adds createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('User', userSchema);
