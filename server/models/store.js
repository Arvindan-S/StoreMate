const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);
