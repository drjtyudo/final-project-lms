const express = require("express");

const {
  getRating,
  createRating,
  updateRating,
  deleteRating,
  getRatingByIdPelatihan,
} = require("../controllers/ratingController.js");
const { verifyToken } = require("../middleware/middleware.js");

const router = express.Router();

router.get("/rating", getRating);
router.get("/rating/:id_pelatihan", getRatingByIdPelatihan);
router.post("/rating/post", verifyToken, createRating);
router.patch("/rating/update/:id", verifyToken, updateRating);
router.delete("/rating/delete/:id", verifyToken, deleteRating);

module.exports = router;
