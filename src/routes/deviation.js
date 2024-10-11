const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto');

/**
 * Calculate the standard deviation of an array of numbers.
 * @param {Array<number>} numbers - Array of numbers.
 * @returns {number} - The standard deviation.
 */
const calculateStandardDeviation = (numbers) => {
  const mean = numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
  const variance = numbers.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / numbers.length;
  return Math.sqrt(variance);
};

/**
 * GET /deviation
 * Returns the standard deviation of the price for the last 100 records of the requested cryptocurrency.
 */
router.get('/deviation', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin query parameter is required.' });
  }

  try {
    // Fetch the last 100 records for the requested coin
    const cryptoRecords = await Crypto.find({ coingecko_id: coin })
      .sort({ timestamp: -1 }) // Sort by latest records
      .limit(100)
      .select('price_usd') // Only select the price field
      .exec();

    if (!cryptoRecords.length) {
      return res.status(404).json({ error: `No data found for coin: ${coin}` });
    }

    // Extract prices from the records
    const prices = cryptoRecords.map(record => record.price_usd);

    // Calculate the standard deviation
    const deviation = calculateStandardDeviation(prices);

    // Return the result
    res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    console.error('❌ Error fetching deviation:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
