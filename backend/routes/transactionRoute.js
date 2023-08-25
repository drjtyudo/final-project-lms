const express = require("express");

const { getTransaction, createTransaction } = require("../controllers/transactionController.js");

const router = express.Router();

router.get("/transaction", getTransaction);
router.post("/transaction", createTransaction);

module.exports = router;
