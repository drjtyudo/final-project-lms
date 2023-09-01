const { Iklan } = require("../helper/relation.js");
const path = require("path");
const crypto = require("crypto");

exports.getIklan = async (req, res) => {
  try {
    const iklans = await Iklan.findAll({});
    res.status(200).json({ msg: "success", iklans });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.postIklan = async (req, res) => {
  const { judul, deskripsi } = req.body;
  try {
    if (req.files === null || req.files.length < 1) {
      return res.status(400).json({ msg: "Masukkan gambar" });
    }

    const imageFile = req.files.banner_image;

    const imageTimestamp = Date.now();
    const imageExt = path.extname(imageFile.name);
    const imageRandomString = crypto.randomBytes(8).toString("hex");
    const banner_image = `${imageTimestamp}-${imageRandomString}${imageExt}`;
    const url_image = `${req.protocol}://${req.get(
      "host"
    )}/assets/banner-iklan/${banner_image}`;
    const imagePath = `./public/assets/banner-iklan/${banner_image}`;

    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(imageExt.toLowerCase()))
      return res.status(422).json({ msg: "invalid image image" });

    const maxSize = 10000000;

    if (imageFile.size > maxSize) {
      return res.status(422).json({ msg: "tidak boleh melebihi 10mb" });
    }

    imageFile.mv(imagePath, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      await Iklan.create({
        banner_image,
        url_image,
        judul,
        deskripsi,
      });
    });
    res.status(201).json({ msg: "iklan posted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
