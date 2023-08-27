const { KontenPPT } = require("../helper/relation.js");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

exports.getAllKontenPPT = async (req, res) => {
  try {
    const response = await KontenPPT.findAll();

    res.status(200).json({ msg: "ok", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getKontenPPTById = async (req, res) => {
  try {
    const response = await KontenPPT.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ msg: "ok", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createKontenPPT = async (req, res) => {
  try {
    const { judulPPT, idSubModule, linkGoogleDrive, durasi } = req.body;

    let pptFileName = null;
    let pptUrl = null;

    if (!linkGoogleDrive && (!req.files || !req.files.ppt)) {
      return res
        .status(400)
        .json({ msg: "Masukkan link google drive atau ppt" });
    }

    if (linkGoogleDrive && req.files && req.files.ppt) {
      return res.status(400).json({
        msg: "Pilih hanya satu opsi: file ppt atau link Google Drive",
      });
    }

    if (req.files && req.files.ppt) {
      const pptFile = req.files.ppt;
      const pptTimestamp = Date.now();
      const pptExt = path.extname(pptFile.name);
      const pptRandomString = crypto.randomBytes(8).toString("hex");
      pptFileName = `${pptTimestamp}-${pptRandomString}${pptExt}`;
      pptUrl = `${req.protocol}://${req.get(
        "host"
      )}/assets/konten/ppts/${pptFileName}`;
      const pptPath = path.join(
        __dirname,
        "../public/assets/konten/ppts",
        pptFileName
      );

      const allowedTypes = [".ppt", ".pptx"];

      if (!allowedTypes.includes(pptExt.toLowerCase())) {
        return res.status(422).json({ msg: "Format file ppt tidak valid" });
      }

      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (pptFile.size > maxSize) {
        return res
          .status(422)
          .json({ msg: "Ukuran file ppt melebihi batas 10 MB" });
      }

      await pptFile.mv(pptPath);
    }

    if (linkGoogleDrive) {
      pptFileName = null;
      pptUrl = null;
    }

    const kontenPPT = await KontenPPT.create({
      judul_ppt: judulPPT,
      id_sub_module: idSubModule,
      linkGdrive: linkGoogleDrive,
      ppt: pptFileName,
      ppt_url: pptUrl,
      durasi,
    });

    res.status(201).json({
      msg: "Konten ppt berhasil dibuat",
      createdData: kontenPPT,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan saat membuat konten ppt",
      error: error.message,
    });
  }
};

exports.updateKontenPPT = async (req, res) => {
  try {
    const { judulPPT, idSubModule, linkGoogleDrive, durasi } = req.body;

    const kontenPPT = await KontenPPT.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kontenPPT) {
      return res.status(404).json({ msg: "Konten ppt tidak ditemukan" });
    }

    if (!linkGoogleDrive && (!req.files || !req.files.ppt)) {
      return res
        .status(400)
        .json({ msg: "Masukkan link google drive atau ppt" });
    }

    if (linkGoogleDrive && req.files && req.files.ppt) {
      return res.status(400).json({
        msg: "Pilih hanya satu opsi: file ppt atau link Google Drive",
      });
    }

    let pptFileName = kontenPPT.ppt;
    let pptUrl = kontenPPT.ppt_url;

    if (req.files && req.files.ppt) {
      const pptFile = req.files.ppt;
      const pptTimestamp = Date.now();
      const pptExt = path.extname(pptFile.name);
      const pptRandomString = crypto.randomBytes(8).toString("hex");
      pptFileName = `${pptTimestamp}-${pptRandomString}${pptExt}`;
      pptUrl = `${req.protocol}://${req.get(
        "host"
      )}/assets/konten/ppts/${pptFileName}`;
      const pptPath = path.join(
        __dirname,
        "../public/assets/konten/ppts",
        pptFileName
      );

      const allowedTypes = [".ppt"];

      if (!allowedTypes.includes(pptExt.toLowerCase())) {
        return res.status(422).json({ msg: "Format file ppt tidak valid" });
      }

      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (pptFile.size > maxSize) {
        return res
          .status(422)
          .json({ msg: "Ukuran file ppt melebihi batas 10 MB" });
      }

      // Hapus file lama jika ada
      if (kontenPPT.ppt) {
        const filePath = path.join(
          __dirname,
          "../public/assets/konten/ppts",
          kontenPPT.ppt
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      await pptFile.mv(pptPath);
    }

    if (linkGoogleDrive) {
      pptFileName = null;
      pptUrl = null;

      if (kontenPPT.ppt) {
        const filePath = path.join(
          __dirname,
          "../public/assets/konten/ppts",
          kontenPPT.ppt
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    await kontenPPT.update({
      judul_ppt: judulPPT,
      id_sub_module: idSubModule,
      linkGdrive: linkGoogleDrive,
      ppt: pptFileName,
      ppt_url: pptUrl,
      durasi,
    });

    res
      .status(200)
      .json({ msg: "Konten ppt berhasil diperbarui", updatedData: kontenPPT });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan saat memperbarui konten ppt",
      error: error.message,
    });
  }
};



exports.deleteKontenPPT = async (req, res) => {
  try {
    const kontenPPT = await KontenPPT.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kontenPPT) {
      return res.status(404).json({ msg: "konten ppt tidak ditemukan" });
    }

    // Hapus file lama jika ada
    if (kontenPPT.ppt) {
      const filePath = path.join(
        __dirname,
        "../public/assets/konten/ppts",
        kontenPPT.ppt
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await kontenPPT.destroy();

    return res.status(200).json({ msg: "konten ppt berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
