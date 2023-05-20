// Task 3: Controller for user balance and ether price
const axios = require('axios');
const Transaction = require('../models/transactionModel');

const getUserBalance = async (req, res) => {
    try {
        const { address } = req.params;

        const userTransactions = await Transaction.find({
            $or: [{ from: address }, { to: address }],
        });

        let balance = 0;
        for (const transaction of userTransactions) {
            if (transaction.to === address) {
                balance += parseFloat(transaction.value);
            } else if (transaction.from === address) {
                balance -= parseFloat(transaction.value);
            }
        }

        const ethPrice = await fetchEtherPrice();

        res.json({ balance, ethPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const fetchEtherPrice = async () => {
    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        return response.data.ethereum.usd;
    } catch (error) {
        console.error('Failed to fetch Ethereum price', error);
        throw new Error('Failed to fetch Ethereum price');
    }
};

module.exports = { getUserBalance };
