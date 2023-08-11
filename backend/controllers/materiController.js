const { Materi } = require("../helper/relation.js");

exports.getAllMateri = async (req, res) => {
  try {
    const response = await Materi.findAll();
    res.status(200).json({ msg: "success", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createMateri = async (req, res) => {
  const { id_module, judul, materi, vidio_link } = req.body;
  try {
    const newMateri = await Materi.create({
      id_module,
      judul,
      materi,
      vidio_link,
    });

    res.status(201).json({ msg: "materi created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getMateriById = async (req, res) => {
  try {
    const response = await Materi.findOne({ where: { id: req.params.id } });
    res.status(200).json({ msg: "success", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateMateri = async (req, res) => {
  const { id_pelatihan, id_module, judul, materi, vidio_link } = req.body;

  try {
    const materiToUpdate = await Materi.findOne({
      where: { id: req.params.id },
    });

    if (!materiToUpdate) {
      return res.status(404).json({ msg: "Materi tidak ditemukan" });
    }

    materiToUpdate.id_pelatihan = id_pelatihan;
    materiToUpdate.id_module = id_module;
    materiToUpdate.judul = judul;
    materiToUpdate.materi = materi;
    materiToUpdate.vidio_link = vidio_link;

    await materiToUpdate.save();

    res
      .status(200)
      .json({ msg: "materi updated", updatedMateri: materiToUpdate });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteMateri = async (req, res) => {
  try {
    const deleteMateri = await Materi.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
