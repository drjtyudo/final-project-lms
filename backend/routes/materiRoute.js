const express = require("express");

const {
  getAllMateri,
  createMateri,
  updateMateri,
  getMateriById,
  deleteMateri,
} = require("../controllers/materiController.js");

const router = express.Router();

router.get("/materi", getAllMateri);
router.get("/materi/:id", getMateriById);
router.post("/materi", createMateri);
router.delete("/materi/delete/:id", deleteMateri);
router.patch("/materi/update/:id", updateMateri);

module.exports = router;
