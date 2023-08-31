const express = require("express");

const {
  getCommentar,
  getAllCommentarById ,
  getReplyCommentar,
  createCommentar,
  createReply,
} = require("../controllers/commentarController.js");
const { verifyToken } = require("../middleware/middleware.js");

const router = express.Router();

// commentar
router.get("/commentar", getCommentar);
router.get("/commentar/pelatihan/:id", getAllCommentarById);
router.post("/commentar/post", verifyToken, createCommentar);

// reply
router.get("/replyCommentar", getReplyCommentar);
router.post("/replyCommentar/post", verifyToken, createReply);

module.exports = router;
