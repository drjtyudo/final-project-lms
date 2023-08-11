const { Pelatihan } = require("../helper/relation");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

exports.getPelatihan = async (req, res) => {
  try {
    const response = await Pelatihan.findAll({});
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.createPelatihan = async (req, res) => {
  try {
    const {
      judul,
      harga,
      deskripsi,
      watching,
      dibuat_oleh,
      untuk,
      id_kategori,
    } = req.body;

    if (req.files === null || req.files.length < 1) {
      return res
        .status(400)
        .json({ msg: "Masukkan image dan background image" });
    }

    const imageFile = req.files.img;

    const imageTimestamp = Date.now();
    const imageExt = path.extname(imageFile.name);
    const imageRandomString = crypto.randomBytes(8).toString("hex");
    const imageFileName = `${imageTimestamp}-${imageRandomString}${imageExt}`;
    const imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/pelatihan-image/${imageFileName}`;
    const imagePath = `./public/assets/pelatihan-image/${imageFileName}`;

    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(imageExt.toLowerCase()))
      return res.status(422).json({ msg: "invalid image image" });

    const maxSize = 10000000; 

    if (imageFile.size > maxSize) {
      return res
        .status(422)
        .json({ msg: "image image must be less than 10MB" });
    }

    imageFile.mv(imagePath, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      const pelatihan = await Pelatihan.create({
        image: imageFileName,
        url: imageUrl,
        judul,
        harga,
        deskripsi,
        watching,
        dibuat_oleh,
        untuk,
        id_kategori,
      });
      res.status(200).json(pelatihan);
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updatePelatihan = async (req, res) => {
 
};

exports.deletePelatihan = async (req, res) => {
  try {
    const pelatihan = await Pelatihan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!pelatihan) {
      return res.status(404).json({ msg: "pelatihan tidak ditemukan" });
    }

    if (pelatihan.image) {
      const filePath = `./public/assets/pelatihan-image/${pelatihan.image}`;
      fs.unlinkSync(filePath);
    }

    await pelatihan.destroy({
      where: {
        id: pelatihan.id,
      },
    });

    return res.status(200).json({ msg: "pelatihan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};