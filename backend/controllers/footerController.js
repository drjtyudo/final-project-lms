const { JudulFooter, Footer } = require("../helper/relation.js");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

exports.getFooter = async (req, res) => {
  try {
    const judulFooter = await JudulFooter.findAll({
      include: [
        {
          model: Footer,
          as: "Footers", // alias di relasi
          attributes: [
            "id",
            "nama_footer",
            "deskripsi",
            "link",
            "image",
            "url",
          ],
        },
      ],
    });

    res.status(200).json({ msg: "suscces", judulFooter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// create judul footer
exports.createJudulFooter = async (req, res) => {
  const { judul_footer } = req.body;
  if (!judul_footer) res.status(404).json({ msg: "masukan judulfooter" });

  try {
    const judulFooter = await JudulFooter.create({
      judul_footer,
    });

    res.status(200).json({ msg: "succes", judulFooter });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update judul footer
exports.updateJudulFooter = async (req, res) => {
  const { judul_footer } = req.body;

  const judulFooter = await JudulFooter.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!judulFooter) {
    return res.status(404).json({ msg: "judul footer tidak ditemukan" });
  }

  try {
    await judulFooter.update({
      judul_footer,
    });
    res.status(200).json({ msg: "judul footer Updated", judulFooter });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete judul footer
exports.deleteJudulFooter = async (req, res) => {
  try {
    const judulFooter = await JudulFooter.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!judulFooter) {
      return res.status(404).json({ msg: "judul Footer tidak ditemukan" });
    }

    const footer = await Footer.findAll({
      where: {
        id_judul_footer: judulFooter.id,
      },
    });

    // Hapus file/gambar footer jika ada
    footer.forEach(async (foot) => {
      if (foot.image) {
        const filePath = path.join(
          __dirname,
          "../public/assets/footer",
          foot.image
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      // Hapus footer satu per satu berkali kali
      await foot.destroy();
    });

    // kalo semua footer terhapus, baru hapus judulFooter
    await judulFooter.destroy();

    return res.status(200).json({ msg: "judul Footer berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create footer
exports.createFooter = async (req, res) => {
  const { id_judul_footer, nama_footer, deskripsi, link } = req.body;
  if (!id_judul_footer)
    res.status(404).json({ msg: "masukan id judul footer" });

  try {
    let imageFileName = null;
    let url = null;

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

      const randomString = crypto.randomBytes(8).toString("hex");
      const timestamp = Date.now();
      imageFileName = `${timestamp}-${randomString}${ext}`;
      url = `${req.protocol}://${req.get(
        "host"
      )}/assets/footer/${imageFileName}`;

      await file.mv(
        path.join(__dirname, "../public/assets/footer", imageFileName),
        (err) => {
          if (err) {
            return res.status(500).json({ msg: err.message });
          }
        }
      );
    }

    const footer = await Footer.create({
      id_judul_footer,
      nama_footer,
      deskripsi,
      link,
      image: imageFileName,
      url: url,
    });

    res.status(200).json({ msg: "succes", footer });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update footer
exports.updateFooter = async (req, res) => {
  const { id_judul_footer, nama_footer, deskripsi, link } = req.body;

  const footer = await Footer.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!footer) {
    return res.status(404).json({ msg: "footer tidak ditemukan" });
  }

  try {
    let imageFileName = footer.image;
    let url = footer.url;

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
      if (footer.image) {
        const filePath = path.join(
          __dirname,
          "../public/assets/footer",
          footer.image
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
      )}/assets/footer/${imageFileName}`;

      await file.mv(
        path.join(__dirname, "../public/assets/footer", imageFileName),
        (err) => {
          if (err) {
            return res.status(500).json({ msg: err.message });
          }
        }
      );
    }

    await footer.update({
      id_judul_footer,
      nama_footer,
      deskripsi,
      link,
      image: imageFileName,
      url,
    });
    res.status(200).json({ msg: "judul footer Updated", footer });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// hapus footer

exports.deleteFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!footer) {
      return res.status(404).json({ msg: "Footer tidak ditemukan" });
    }

    // Hapus file/gambar footer jika ada
    if (footer.image) {
      const filePath = path.join(
        __dirname,
        "../public/assets/footer",
        footer.image
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await footer.destroy();

    return res.status(200).json({ msg: "Footer berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// catatan:
// anak-anak dari judul footer tidak ikut terhapus padahal sudah direlasikan pada file relasi.js, apakah harus di relasikan di databasenya?
