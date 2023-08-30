const { Module, SubModule } = require("../helper/relation.js");

exports.getAllModule = async (req, res) => {
  try {
    const response = await Module.findAll({
      include: [{ model: SubModule, as: "SubModules" }],
    });
    res.status(200).json({ msg: "success", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getAllModuleAndSubmoduleByIdPelatihan = async (req, res) => {
  try {
    const moduleAndSubMoudule = await Module.findAll({
      include: [
        {
          model: SubModule,
          as: "SubModules",
        },
      ],
      where : {
        id_pelatihan : req.params.id
      }
    });

    res.status(200).json({ msg: "suscces", moduleAndSubMoudule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};


exports.createModule = async (req, res) => {
  const { module, id_pelatihan} = req.body;
  try {
    const newModule = await Module.create({
      id_pelatihan,
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
