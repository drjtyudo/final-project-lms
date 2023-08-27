const express = require("express");
const {
  getAllKontenPembahasan,
  getKontenPembahasanById,
  createKontenPembahasan,
  deleteKontenPembahasan,
  updateKontenPembahasan,
} = require("../controllers/kontenTambahPembahasan");

const router = express.Router();

router.get("/konten-pembahasan", getAllKontenPembahasan);
router.get("/konten-pembahasan/:id", getKontenPembahasanById);
router.post("/konten-pembahasan", createKontenPembahasan);
router.patch("/konten-pembahasan/:id", updateKontenPembahasan);
router.delete("/konten-pembahasan/:id", deleteKontenPembahasan);

module.exports = router;
