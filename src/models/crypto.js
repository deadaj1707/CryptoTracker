// src/models/Crypto.js
const mongoose = require('mongoose');

// Define a schema for storing cryptocurrency data
const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coingecko_id: {
    type: String,
    required: true,
  },
  price_usd: {
    type: Number,
    required: true,
  },
  market_cap_usd: {
    type: Number,
    required: true,
  },
  change_24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create a Mongoose model from the schema
const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
