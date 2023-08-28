const { KontenPdf } = require("../helper/relation.js");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

exports.getAllKontenPdf = async (req, res) => {
  try {
    const response = await KontenPdf.findAll();

    res.status(200).json({ msg: "ok", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getKontenPdfById = async (req, res) => {
  try {
    const response = await KontenPdf.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ msg: "ok", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createKontenPdf = async (req, res) => {
  try {
    const { judulFile, idSubModule, linkGoogleDrive, durasi } = req.body;

    let pdfFileName = null;
    let pdfUrl = null;

    
    if (!linkGoogleDrive && (!req.files || !req.files.pdf)) {
      return res
        .status(400)
        .json({ msg: "Masukkan link google drive atau pdf" });
    }

    if (linkGoogleDrive && req.files && req.files.pdf) {
      return res.status(400).json({
        msg: "Pilih hanya satu opsi: file PDF atau link Google Drive",
      });
    }

    if (req.files && req.files.pdf) {
      const pdfFile = req.files.pdf;
      const pdfTimestamp = Date.now();
      const pdfExt = path.extname(pdfFile.name);
      const pdfRandomString = crypto.randomBytes(8).toString("hex");
      pdfFileName = `${pdfTimestamp}-${pdfRandomString}${pdfExt}`;
      pdfUrl = `${req.protocol}://${req.get(
        "host"
      )}/assets/konten/pdfs/${pdfFileName}`;
      const pdfPath = path.join(
        __dirname,
        "../public/assets/konten/pdfs",
        pdfFileName
      );

      const allowedTypes = [".pdf"];

      if (!allowedTypes.includes(pdfExt.toLowerCase())) {
        return res.status(422).json({ msg: "Format file PDF tidak valid" });
      }

      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (pdfFile.size > maxSize) {
        return res
          .status(422)
          .json({ msg: "Ukuran file PDF melebihi batas 10 MB" });
      }

      await pdfFile.mv(pdfPath);
    }

    if (linkGoogleDrive) {
      pdfFileName = null;
      pdfUrl = null;
    }

    const kontenPdf = await KontenPdf.create({
      judul_file: judulFile,
      id_sub_module: idSubModule,
      linkGdrive: linkGoogleDrive,
      pdf: pdfFileName,
      pdf_url: pdfUrl,
      durasi,
    });

    res.status(201).json({
      msg: "Konten PDF berhasil dibuat",
      createdData: kontenPdf,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan saat membuat konten PDF",
      error: error.message,
    });
  }
};

exports.updateKontenPdf = async (req, res) => {
  try {
    const { judulFile, idSubModule, linkGoogleDrive, durasi } = req.body;

    const kontenPdf = await KontenPdf.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kontenPdf) {
      return res.status(404).json({ msg: "Konten PDF tidak ditemukan" });
    }

    if (!linkGoogleDrive && (!req.files || !req.files.pdf)) {
      return res
        .status(400)
        .json({ msg: "Masukkan link google drive atau pdf" });
    }

    
    if (linkGoogleDrive && req.files && req.files.pdf) {
      return res.status(400).json({
        msg: "Pilih hanya satu opsi: file PDF atau link Google Drive",
      });
    }

    let pdfFileName = kontenPdf.pdf;
    let pdfUrl = kontenPdf.pdf_url;

    if (req.files && req.files.pdf) {
      const pdfFile = req.files.pdf;
      const pdfTimestamp = Date.now();
      const pdfExt = path.extname(pdfFile.name);
      const pdfRandomString = crypto.randomBytes(8).toString("hex");
      pdfFileName = `${pdfTimestamp}-${pdfRandomString}${pdfExt}`;
      pdfUrl = `${req.protocol}://${req.get(
        "host"
      )}/assets/konten/pdfs/${pdfFileName}`;
      const pdfPath = path.join(
        __dirname,
        "../public/assets/konten/pdfs",
        pdfFileName
      );

      const allowedTypes = [".pdf"];

      if (!allowedTypes.includes(pdfExt.toLowerCase())) {
        return res.status(422).json({ msg: "Format file PDF tidak valid" });
      }

      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (pdfFile.size > maxSize) {
        return res
          .status(422)
          .json({ msg: "Ukuran file PDF melebihi batas 10 MB" });
      }

      // Hapus file lama jika ada
      if (kontenPdf.pdf) {
        const filePath = path.join(
          __dirname,
          "../public/assets/konten/pdfs",
          kontenPdf.pdf
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await pdfFile.mv(pdfPath);
    }

    if (linkGoogleDrive) {
      pdfFileName = null;
      pdfUrl = null;

      if (kontenPdf.pdf) {
        const filePath = path.join(
          __dirname,
          "../public/assets/konten/pdfs",
          kontenPdf.pdf
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
   
    }

    await kontenPdf.update({
      judul_file: judulFile,
      id_sub_module: idSubModule,
      linkGdrive: linkGoogleDrive,
      pdf: pdfFileName,
      pdf_url: pdfUrl,
      durasi,
    });

    res
      .status(200)
      .json({ msg: "Konten PDF berhasil diperbarui", updatedData: kontenPdf });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan saat memperbarui konten PDF",
      error: error.message,
    });
  }
};

exports.deleteKontenPdf = async (req, res) => {
  try {
    const kontenPdf = await KontenPdf.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kontenPdf) {
      return res.status(404).json({ msg: "konten pdf tidak ditemukan" });
    }

    // Hapus file lama jika ada
    if (kontenPdf.pdf) {
      const filePath = path.join(
        __dirname,
        "../public/assets/konten/pdfs",
        kontenPdf.pdf
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await kontenPdf.destroy();

    return res.status(200).json({ msg: "konten pdf berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
