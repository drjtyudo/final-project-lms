const express = require("express");

const {
  getAllModule,
  createModule,
  getModuleById,
  getAllModuleAndSubmoduleByIdPelatihan
} = require("../controllers/moduleController.js");

const router = express.Router();

router.get("/module", getAllModule);
router.get("/module/:id", getModuleById);
router.get("/module/pelatihan/:id", getAllModuleAndSubmoduleByIdPelatihan);
router.post("/module", createModule);

module.exports = router;
