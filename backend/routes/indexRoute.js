const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { title: "API Nusa Learning" });
});
router.get("/list-api", function (req, res) {
  res.render("list", { title: "API List" });
});

module.exports = router;
