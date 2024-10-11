const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto');

/**
 * GET /stats
 * Returns the latest data for the requested cryptocurrency.
 */
router.get('/stats', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin query parameter is required.' });
  }

  try {
    // Fetch the latest data for the requested coin
    const cryptoData = await Crypto.findOne({ coingecko_id: coin })
      .sort({ timestamp: -1 }) // Sort by latest timestamp
      .exec();

    if (!cryptoData) {
      return res.status(404).json({ error: `No data found for coin: ${coin}` });
    }

    // Prepare the response
    const response = {
      price: cryptoData.price_usd,
      marketCap: cryptoData.market_cap_usd,
      "24hChange": cryptoData.change_24h,
    };

    res.json(response);
  } catch (error) {
    console.error('❌ Error fetching stats:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
