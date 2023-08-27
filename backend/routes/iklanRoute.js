const express = require("express");

const { getIklan, postIklan } = require("../controllers/iklanController.js");

const router = express.Router();

router.get("/iklan", getIklan);
router.post("/iklan/post", postIklan);

module.exports = router;
