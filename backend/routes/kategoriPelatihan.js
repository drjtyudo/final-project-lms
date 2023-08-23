const express = require("express");

const {
  getAll, create
} = require("../controllers/kategoriPelatihan.js");

const router = express.Router();

router.get("/test", getAll);
router.post("/addKategoriPelatihan", create);
// router.get("/module/:id", getModuleById);
// router.post("/module", createModule);

module.exports = router;
