const express = require("express");

const {getPelatihanSaya} = require("../controllers/pelatihanSaya.js")

const router = express.Router();

router.get("/pelatihanSaya/:userId", getPelatihanSaya)

module.exports = router;
