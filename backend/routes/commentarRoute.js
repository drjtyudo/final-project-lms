const express = require("express");

const {
  getCommentar,
  getReplyCommentar,
  createCommentar,
  createReply,
} = require("../controllers/commentarController.js");
const { verifyToken } = require("../middleware/middleware.js");

const router = express.Router();

// commentar
router.get("/commentar", getCommentar);
router.post("/commentar/post", verifyToken, createCommentar);

// reply
router.get("/replyCommentar", getReplyCommentar);
router.post("/replyCommentar/post", verifyToken, createReply);

module.exports = router;
