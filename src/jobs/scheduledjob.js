const cron = require('node-cron');
const Cryptocurrency = require('../models/crypto');
const { fetchCryptoData } = require('../services/coingeckoservice');

// Define the CoinGecko IDs for the cryptocurrencies
const CRYPTO_IDS = ['bitcoin', 'matic-network', 'ethereum'];

/**
 * Fetches cryptocurrency data and stores it in the database.
 */
const fetchAndStoreCryptoData = async () => {
  try {
    console.log('🔄 Fetching crypto data...');
    const data = await fetchCryptoData(CRYPTO_IDS);
    const timestamp = new Date();

    const cryptoDocs = data.map((coin) => ({
      name: coin.name,
      coingecko_id: coin.id,
      price_usd: coin.current_price,
      market_cap_usd: coin.market_cap,
      change_24h: coin.price_change_percentage_24h,
      timestamp,
    }));

    await Cryptocurrency.insertMany(cryptoDocs);
    console.log(`✅ [${timestamp.toLocaleString()}] Crypto data fetched and stored successfully.`);
  } catch (error) {
    console.error('❌ Error in fetchAndStoreCryptoData:', error.message);
  }
};

/**
 * Schedules the background job to run every 2 hours and triggers the first fetch immediately.
 */
const scheduleJob = () => {
  // Trigger the first fetch immediately when the app starts
  fetchAndStoreCryptoData();

  // Schedule the job to run every 2 hours (at minute 0)
  cron.schedule('0 */2 * * *', () => {
    console.log('🔄 Running scheduled job to fetch crypto data...');
    fetchAndStoreCryptoData();
  });

  console.log('🕒 Scheduled crypto data fetching job to run every 2 hours.');
};

module.exports = { scheduleJob };
