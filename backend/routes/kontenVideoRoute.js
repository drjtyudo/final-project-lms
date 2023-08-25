const express = require("express");
const {
  getAllKontenVideo,
  getKontenVideoById,
  createKontenVideo,
  updateKontenVideo,
  deleteKontenVideo,
} = require("../controllers/kontenVideo.js");

const router = express.Router();

router.get("/konten-video", getAllKontenVideo);
router.post("/konten-video", createKontenVideo);
router.get("/konten-video/:id", getKontenVideoById);
router.patch("/konten-video/:id", updateKontenVideo);
router.delete("/konten-video/:id", deleteKontenVideo);

module.exports = router;