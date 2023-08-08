const express = require("express");
const { getKategori, createKategori, getKategoriById, deleteKategori, updateKategori } = require("../controllers/kategoriController.js");

const router = express.Router();

router.get("/kategori", getKategori);
router.post("/kategori", createKategori);
router.get("/kategori/:id", getKategoriById);
router.patch("/kategori/update/:id", updateKategori);
router.delete("/kategori/delete/:id", deleteKategori);

module.exports = router;
