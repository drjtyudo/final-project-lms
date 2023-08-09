const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// 
const kategoriRoute = require("./routes/kategoriRoute.js");
const moduleRoute = require("./routes/moduleRoute.js");
const materiRoute = require("./routes/materiRoute.js");
const Pelatihan = require('./routes/pelatihanRoute')

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
// Use router
app.use(kategoriRoute);
app.use(moduleRoute);
app.use(materiRoute);
app.use(Pelatihan)

app.get("/", (req, res) => {
  res.send("Hello Bang");
});

app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
