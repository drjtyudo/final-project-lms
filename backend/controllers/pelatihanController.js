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
      return res.status(400).json({ msg: "Masukkan gambar" });
    }

    const imageFile = req.files.image;

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
      return res.status(422).json({ msg: "tidak boleh melebihi 10mb" });
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
  const pelatihan = await Pelatihan.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!pelatihan) {
    return res.status(404).json({ msg: "pelatihan tidak ditemukan" });
  }

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

    let imageFileName = pelatihan.image;
    let url = pelatihan.url;

    if (req.files && req.files.image) {
      const file = req.files.image;

      // Periksa jenis file dan ukuran file
      const ext = path.extname(file.name);

      const allowedTypes = [".png", ".jpg", ".jpeg"];

      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid image file" });
      }

      const maxSize = 10 * 1024 * 1024; // 10MB

      if (file.size > maxSize) {
        return res.status(422).json({ msg: "Maximum file size is 10MB" });
      }

      // Hapus file lama jika ada
      if (pelatihan.image) {
        const filePath = path.join(
          __dirname,
          "../public/assets/pelatihan-image",
          pelatihan.image
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      const randomString = crypto.randomBytes(8).toString("hex");
      const timestamp = Date.now();
      imageFileName = `${timestamp}-${randomString}${ext}`;
      url = `${req.protocol}://${req.get(
        "host"
      )}/assets/pelatihan-image/${imageFileName}`;

      file.mv(
        path.join(__dirname, "../public/assets/pelatihan-image", imageFileName),
        (err) => {
          if (err) {
            return res.status(500).json({ msg: err.message });
          }
        }
      );
    }

    await Pelatihan.update(
      {
        image: imageFileName,
        url,
        judul,
        harga,
        deskripsi,
        watching,
        dibuat_oleh,
        untuk,
        id_kategori,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({ msg: "Pelatihan Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
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

      // Hapus file lama jika ada
      if (pelatihan.image) {
        const filePath = path.join(
          __dirname,
          "../public/assets/pelatihan-image",
          pelatihan.image
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
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
