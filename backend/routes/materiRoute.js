const express = require("express");

const {
  getAllMateri,
  createMateri,
  updateMateri,
  getMateriById,
} = require("../controllers/materiController.js");

const router = express.Router();

router.get("/materi", getAllMateri);
router.get("/materi/:id", getMateriById);
router.post("/materi", createMateri);
router.patch("/materi/:id", updateMateri);

module.exports = router;
