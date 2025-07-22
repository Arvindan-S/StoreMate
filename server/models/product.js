const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  unit: { type: String, required: true }, // example: kg, litre, piece
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
