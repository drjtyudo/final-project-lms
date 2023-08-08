const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// require router
const Pelatihan = require('./routes/pelatihanRoute')

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
// Use router
app.use(Pelatihan)

app.get("/", (req, res) => {
  res.send("Hello Bang");
});

app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
