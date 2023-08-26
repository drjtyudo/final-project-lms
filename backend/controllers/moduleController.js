const { Module, Materi } = require("../helper/relation.js");

exports.getAllModule = async (req, res) => {
  try {
    const response = await Module.findAll({
      include: [{ model: Materi, as: "Materis" }],
    });
    res.status(200).json({ msg: "success", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createModule = async (req, res) => {
  const { module} = req.body;
  try {
    const newModule = await Module.create({
      module,
    });
    res.status(201).json({ msg: "module created", newModule });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getModuleById = async (req, res) => {
  try {
    const modules = await Module.findOne({
      where: { id: req.params.id },
    });

    if (!modules || modules.length === 0) {
      return res
        .status(404)
        .json({ msg: "tidak ada modul dengan ID materi yang diberikan" });
    }

    res.status(200).json({ msg: "success", modules });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
