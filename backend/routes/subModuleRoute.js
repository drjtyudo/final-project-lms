const express = require("express");

const {
  getAllSubModule,
  createSubModule,
  updateSubModule,
  getSubModuleById,
  deleteSubModule,
} = require("../controllers/subModuleController");

const router = express.Router();

router.get("/sub-module", getAllSubModule);
router.post("/sub-module", createSubModule);
router.get("/sub-module/:id", getSubModuleById);
router.delete("/sub-module/delete/:id", deleteSubModule);
router.patch("/sub-module/update/:id", updateSubModule);

module.exports = router;
