// Task 1: Controller for fetching transactions
const axios = require('axios');
const Transaction = require('../models/transactionModel');

const fetchTransactions = async (req, res) => {
    try {
        const { address } = req.params;

        // Validate address format
        const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
        if (!addressRegex.test(address)) {
            throw new Error('Invalid address format');
        }

        const apiKey = 'ZAGtf0HBalINFItQJjPczp7z2jjRAUJBFkO9AzJNTJJyW3eFVExZnHcrDe6SU8LZ';

        const response = await axios.get(
            `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`
        );

        const transactions = response.data.result;
        await Transaction.insertMany(transactions);

        res.json(transactions);
    } catch (error) {
        console.error('Failed to fetch transactions', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { fetchTransactions };
