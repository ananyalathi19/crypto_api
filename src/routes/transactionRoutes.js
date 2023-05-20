const express = require('express');
const { fetchTransactions } = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions/:address', fetchTransactions);

module.exports = router;
