const { SubModule } = require("../helper/relation.js");

exports.getAllSubModule = async (req, res) => {
  try {
    const response = await SubModule.findAll();
    res.status(200).json({ msg: "success", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createSubModule = async (req, res) => {
  const { id_module, judul, penerbit, status ,penerbitan } = req.body;
  try {
    const newsubModule = await SubModule.create({
      id_module,
      judul,
      penerbit,
      status,
      penerbitan
    });

    res.status(201).json({ msg: "subModule created"  , newsubModule });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

};

exports.getSubModuleById = async (req, res) => {
  try {
    const response = await SubModule.findOne({ where: { id: req.params.id } });
    res.status(200).json({ msg: "success", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateSubModule = async (req, res) => {
  const { id_module, judul, penerbit, status ,penerbitan } = req.body;

  try {
    const subModuleToUpdate = await SubModule.findOne({
      where: { id: req.params.id },
    });

    if (!subModuleToUpdate) {
      return res.status(404).json({ msg: "subModule tidak ditemukan" });
    }

    subModuleToUpdate.id_module = id_module;
    subModuleToUpdate.judul = judul;
    subModuleToUpdate.penerbit = penerbit;
    subModuleToUpdate.status = status;
    subModuleToUpdate.penerbitan = penerbitan;

    await subModuleToUpdate.save();

    res
      .status(200)
      .json({ msg: "subModule updated", updatedsubModule: subModuleToUpdate });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



exports.deleteSubModule = async (req, res) => {
  try {
     await subModule.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


