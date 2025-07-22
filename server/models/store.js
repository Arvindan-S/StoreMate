const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  location: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);
