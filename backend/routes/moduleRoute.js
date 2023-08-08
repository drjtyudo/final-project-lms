const express = require("express");

const {
  getAllModule,
  createModule,
  getModuleById,
} = require("../controllers/moduleController.js");

const router = express.Router();

router.get("/module", getAllModule);
router.get("/module/:idMateri", getModuleById);
router.post("/module", createModule);

module.exports = router;
