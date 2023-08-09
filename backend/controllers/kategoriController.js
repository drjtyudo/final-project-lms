const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { Kategori, Module } = require("../helper/relation.js");

exports.getKategori = async (req, res) => {
  try {
    const response = await Kategori.findAll({
      include: { model: Module, as: "Modules" },
    });
    res.status(200).json({ msg: "success", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createKategori = async (req, res) => {
  const { kategori, deskripsi, id_pelatihan } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msg: "Tidak ada file yang diunggah" });
  }

  const file = req.files.image_logo;
  if (!file) {
    return res.status(404).json({ msg: "File tidak ditemukan" });
  }

  const timeStamp = Date.now();
  const ext = path.extname(file.name);
  const randomString = crypto.randomBytes(8).toString("hex");
  const allowedTypes = [".png", ".jpg", ".jpeg"];

  if (!allowedTypes.includes(ext.toLowerCase())) {
    return res.status(422).json({
      msg: "Jenis file gambar tidak valid. Harap unggah file gambar dengan ekstensi PNG, JPG, atau JPEG",
    });
  }

  if (file.size > 10 * 1024 * 1024) {
    return res
      .status(422)
      .json({ msg: "Ukuran file tidak boleh lebih dari 10MB" });
  }

  const filename = `${timeStamp}-${randomString}${ext}`;
  const url = `${req.protocol}://${req.get("host")}/kategori/logo/${filename}`;

  try {
    const newKategori = await Kategori.create({
      kategori,
      deskripsi,
      image_logo: filename,
      url_image: url,
      id_pelatihan,
    });

    file.mv(`./public/kategori/logo/${filename}`, async (err) => {
      if (err) {
        await Kategori.destroy({ where: { id: createdProduct.id } }); // Menghapus produk yang sudah dibuat
        return res
          .status(500)
          .json({ msg: "Terjadi kesalahan saat mengunggah gambar" });
      }

      res.status(201).json({ msg: "kategori created", newKategori });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getKategoriById = async (req, res) => {
  try {
    const response = await Kategori.findOne({ where: { id: req.params.id } });
    res.status(200).json({ msg: "success", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteKategori = async (req, res) => {
  try {
    await Kategori.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "success delete kategori" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateKategori = async (req, res) => {
  const { kategori, deskripsi, id_pelatihan } = req.body;

  try {
    const existingKategori = await Kategori.findOne({
      where: { id: req.params.id },
    });

    if (!existingKategori) {
      return res.status(404).json({ msg: "Kategori tidak ditemukan" });
    }

    // Mendapatkan data image_logo dan url_image yang sudah ada
    const { image_logo: existingImageLogo, url_image: existingUrlImage } =
      existingKategori;

    const file = req.files && req.files.image_logo;

    // Jika ada file gambar baru, lakukan proses pembaruan file gambar
    if (file) {
      const timeStamp = Date.now();
      const ext = path.extname(file.name);
      const randomString = crypto.randomBytes(8).toString("hex");
      const allowedTypes = [".png", ".jpg", ".jpeg"];

      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({
          msg: "Jenis file gambar tidak valid. Harap unggah file gambar dengan ekstensi PNG, JPG, atau JPEG",
        });
      }

      if (file.size > 10 * 1024 * 1024) {
        return res
          .status(422)
          .json({ msg: "Ukuran file tidak boleh lebih dari 10MB" });
      }

      const filename = `${timeStamp}-${randomString}${ext}`;
      const url = `${req.protocol}://${req.get(
        "host"
      )}/kategori/logo/${filename}`;

      // Hapus file lama sebelum menyimpan file baru
      if (existingImageLogo) {
        const filePath = `./public/kategori/logo/${existingImageLogo}`;
        fs.unlinkSync(filePath);
      }

      // Pembaruan data image_logo dan url_image
      existingKategori.image_logo = filename;
      existingKategori.url_image = url;

      // Pindahkan file gambar baru ke direktori yang sesuai
      file.mv(`./public/kategori/logo/${filename}`, async (err) => {
        if (err) {
          return res
            .status(500)
            .json({ msg: "Terjadi kesalahan saat mengunggah gambar" });
        }

        // Simpan perubahan data kategori
        await existingKategori.save();

        // Pembaruan kategori dan deskripsi
        existingKategori.kategori = kategori;
        existingKategori.deskripsi = deskripsi;
        await existingKategori.save();

        res.status(200).json({
          msg: "Kategori berhasil diperbarui",
          updatedKategori: existingKategori,
        });
      });
    } else {
      // Jika tidak ada file gambar baru, lakukan pembaruan kategori dan deskripsi saja
      existingKategori.kategori = kategori;
      existingKategori.deskripsi = deskripsi;
      existingKategori.id_pelatihan = id_pelatihan;
      await existingKategori.save();

      res.status(200).json({
        msg: "Kategori berhasil diperbarui",
        updatedKategori: existingKategori,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
