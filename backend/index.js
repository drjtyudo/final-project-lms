const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const indexRoute = require("./routes/indexRoute.js");
const usersRoute = require("./routes/usersRoute.js");
const kategoriRoute = require("./routes/kategoriRoute.js");
const moduleRoute = require("./routes/moduleRoute.js");
const subMateriRoute = require("./routes/subModuleRoute.js");
const Pelatihan = require("./routes/pelatihanRoute");
const PelatihanKategori = require("./routes/kategoriPelatihan.js");
const ratingRoute = require("./routes/ratingRoute.js");
const commentarRoute = require("./routes/commentarRoute.js");
const iklanRoute = require("./routes/iklanRoute.js");
const Footer = require("./routes/footerRoute.js");
const KontenPdf = require('./routes/kontenPdfRoute.js');
const KontenVideo = require('./routes/kontenVideoRoute.js');
const KontenPPT = require('./routes/kontenPPTRoute.js');
const KontenPembahasan = require('./routes/kontenTambahPembahasan.js');
const viewsRoute = require('./routes/viewsRoute.js');
const transactionRoute = require("./routes/transactionRoute.js")

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://192.168.100.4:3000"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(`${__dirname}/./public/views`));
app.set("view engine", "ejs");

// Use router
app.use(indexRoute);
app.use(usersRoute);
app.use(kategoriRoute);
app.use(moduleRoute);
app.use(subMateriRoute);
app.use(Pelatihan);
app.use(PelatihanKategori);
app.use(ratingRoute);
app.use(commentarRoute);
app.use(iklanRoute);
app.use(Footer);
app.use(KontenPdf)
app.use(KontenVideo)
app.use(KontenPPT)
app.use(KontenPembahasan)
app.use(viewsRoute)
app.use(transactionRoute)

app.get("*", (req, res) => {
  res.status(404).json({ msg: "Url not found" });
});

app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
