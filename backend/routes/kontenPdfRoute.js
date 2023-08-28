const express = require("express");
const {
  getAllKontenPdf,
  getKontenPdfById,
  createKontenPdf,
  updateKontenPdf,
  deleteKontenPdf,
} = require("../controllers/kontenPdf.js");

const router = express.Router();

router.get("/konten-pdf", getAllKontenPdf);
router.post("/konten-pdf", createKontenPdf);
router.get("/konten-pdf/:id", getKontenPdfById);
router.patch("/konten-pdf/:id", updateKontenPdf);
router.delete("/konten-pdf/:id", deleteKontenPdf);

module.exports = router;
// router.post("/konten-pdf", getAllKontenPdf); // get data pake post berhasil
