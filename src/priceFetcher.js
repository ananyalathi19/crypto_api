const axios = require('axios');
const mongoose = require('mongoose');

const connectDB = require('./config/database');

const fetchAndStorePrice = async () => {
    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );

        const ethPrice = response.data.ethereum.usd;
        const Price = mongoose.model('Price', { price: Number });
        const price = new Price({ price: ethPrice });
        await price.save();
    } catch (error) {
        console.error('Failed to fetch and store Ethereum price', error);
        throw error;
    }
};

module.exports = { fetchAndStorePrice };

