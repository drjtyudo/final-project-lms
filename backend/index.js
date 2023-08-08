const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const kategoriRoute = require("./routes/kategoriRoute.js");
const moduleRoute = require("./routes/moduleRoute.js");
const materiRoute = require("./routes/materiRoute.js");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

app.use(kategoriRoute);
app.use(moduleRoute);
app.use(materiRoute);

app.get("/", (req, res) => {
  res.send("Hello Bang");
});

app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
