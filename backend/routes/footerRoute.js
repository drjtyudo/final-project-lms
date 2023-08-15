const express = require("express");
const {
  getFooter,
  createJudulFooter,
  createFooter,
  deleteJudulFooter,
  updateJudulFooter,
  updateFooter,
  deleteFooter
} = require("../controllers/footerController.js");

const router = express.Router();

// GET ALL judul footer and footer
router.get("/footer", getFooter);

// judul footer
router.post("/judulFooter", createJudulFooter);
router.delete("/judulFooter/:id", deleteJudulFooter);
router.patch("/judulFooter/:id", updateJudulFooter);
// footer
router.post("/footer", createFooter);
router.patch("/footer/:id", updateFooter);
router.delete("/footer/:id", deleteFooter);

module.exports = router;
