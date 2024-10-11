// src/services/coingeckoService.js
const axios = require('axios');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets';

/**
 * Fetch cryptocurrency data from CoinGecko.
 *
 * @param {Array<string>} ids - Array of CoinGecko IDs.
 * @param {string} vs_currency - The target currency (default: 'usd').
 * @returns {Promise<Array<Object>>} - Array of cryptocurrency data.
 */
const fetchCryptoData = async (ids, vs_currency = 'usd') => {
  try {
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        vs_currency,
        ids: ids.join(','),
        order: 'market_cap_desc',
        per_page: ids.length,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h',
      },
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching data from CoinGecko:', error.message);
    throw error;
  }
};

module.exports = { fetchCryptoData };
