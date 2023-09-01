const express = require("express");

const {getPelatihanSaya , getPelatihanByIdPelatihanSaya} = require("../controllers/pelatihanSaya.js")

const router = express.Router();

router.get("/pelatihanSaya/:userId", getPelatihanSaya)
router.get("/pelatihan/pelatihan-saya/:id", getPelatihanByIdPelatihanSaya)

module.exports = router;
