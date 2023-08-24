const { KontenPembahasan } = require("../helper/relation.js");

exports.getAllKontenPembahasan = async (req, res) => {
  try {
    const response = await KontenPembahasan.findAll();

    res.status(200).json({ msg: "ok", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getKontenPembahasanById = async (req, res) => {
  try {
    const response = await KontenPembahasan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!response) {
      return res
        .status(404)
        .json({ msg: "konten tambah pembahasan tidak ditemukan" });
    }

    res.status(200).json({ msg: "ok", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createKontenPembahasan = async (req, res) => {
  const { judulPembahasan, idSubModule, deskripsi, durasi } = req.body;
  try {
    const kontenPembahasan = await KontenPembahasan.create({
      judul_pembahasan: judulPembahasan,
      id_sub_module: idSubModule,
      deskripsi,
      durasi,
    });

    res.status(201).json({
      msg: "Konten tambah pembahasan berhasil dibuat",
      createdData: kontenPembahasan,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan saat membuat konten tambah pembahasan",
      error: error.message,
    });
  }
};

exports.updateKontenPembahasan = async (req, res) => {
  const { judulPembahasan, idSubModule, deskripsi, durasi } = req.body;

  const kontenPembahasan = await KontenPembahasan.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!kontenPembahasan) {
    return res
      .status(404)
      .json({ msg: "Konten tambah pembahasan tidak ditemukan" });
  }

  try {
    await kontenPembahasan.update({
      judul_pembahasan: judulPembahasan,
      id_sub_module: idSubModule,
      deskripsi,
      durasi,
    });

    res.status(200).json({
      msg: "Konten tambah pembahasan berhasil diperbarui",
      updatedData: kontenPembahasan,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan saat memperbarui konten tambah pembahasan",
      error: error.message,
    });
  }
};

exports.deleteKontenPembahasan = async (req, res) => {
  try {
    const kontenPembahasan = await KontenPembahasan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kontenPembahasan) {
      return res
        .status(404)
        .json({ msg: "konten tambah pembahasan tidak ditemukan" });
    }

    await kontenPembahasan.destroy();

    return res
      .status(200)
      .json({ msg: "konten tambah pembahasan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
