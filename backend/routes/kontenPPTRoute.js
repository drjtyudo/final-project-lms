const express = require("express");
const {
  getAllKontenPPT,
  getKontenPPTById,
  createKontenPPT,
  deleteKontenPPT,
  updateKontenPPT,
} = require("../controllers/kontenPPT.js");

const router = express.Router();

router.get("/konten-ppt", getAllKontenPPT);
router.get("/konten-ppt/:id",   getKontenPPTById);
router.post("/konten-ppt", createKontenPPT);
router.patch("/konten-ppt/:id", updateKontenPPT);
router.delete("/konten-ppt/:id", deleteKontenPPT);

module.exports = router;
