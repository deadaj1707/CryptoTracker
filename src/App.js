// src/app.js
const connectDB = require('./config/dbconfig');
const { scheduleJob } = require('./jobs/scheduledjob');
const dotenv = require('dotenv');
const express = require('express');
const statsRoute = require('./routes/stats');

const deviationRoute = require('./routes/deviation');

const app = express();

// Connect to MongoDB
connectDB();

// Schedule the job to fetch and store crypto data
scheduleJob();

// Define the routes
app.use('/api', statsRoute);
app.use('/api', deviationRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
// Optional: If you plan to expand the application with APIs or other features,
// you can set up an Express server here.

// Example (Commented Out):
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   res.send('Crypto Monitor Server is running.');
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });
