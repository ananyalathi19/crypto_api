const express = require('express');
const connectDB = require('./src/config/database');
const transactionRoutes = require('./src/routes/transactionRoutes');
const { getUserBalance } = require('./src/controllers/userController');
const { fetchAndStorePrice } = require('./src/priceFetcher');
const { fetchTransactions } = require('./src/controllers/transactionController');
const mongoose = require('./src/config/database');
const app = express();


// Connect to MongoDB
connectDB();

app.get('/api/transactions/:address', fetchTransactions);

// User balance route
app.get('/api/user/:address', getUserBalance);

// Fetch and store Ethereum price every 10 minutes
const fetchPriceInterval = 10 * 60 * 1000;
setInterval(fetchAndStorePrice, fetchPriceInterval, (error) => {
    if (error) {
        console.error('Failed to fetch and store Ethereum price', error);
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

