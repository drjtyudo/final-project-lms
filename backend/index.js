const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const usersRoute = require("./routes/usersRoute.js");
const kategoriRoute = require("./routes/kategoriRoute.js");
const moduleRoute = require("./routes/moduleRoute.js");
const materiRoute = require("./routes/materiRoute.js");
const Pelatihan = require("./routes/pelatihanRoute");
const PelatihanKategori = require("./routes/kategoriPelatihan.js");
const Footer = require("./routes/footerRoute.js");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:1501", "http://192.168.100.4:1501"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));
// Use router
app.use(usersRoute);
app.use(kategoriRoute);
app.use(moduleRoute);
app.use(materiRoute);
app.use(Pelatihan);
app.use(PelatihanKategori);
app.use(Footer);

app.get("/", (req, res) => {
  res.send("Hello Bang");
});

app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
