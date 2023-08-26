const express = require("express");

const {
  getTransaction,
  getTransactionById,
  createTransaction,
  PayPelatihan,
} = require("../controllers/transactionController.js");
const { verifyToken } = require("../middleware/middleware.js");

const router = express.Router();

router.get("/transaction", getTransaction);
router.get("/transaction/:id", getTransactionById);
router.post("/transaction", verifyToken, createTransaction);
router.post("/transaction/pay/:transactionId", PayPelatihan);

module.exports = router;
