const { Views } = require("../helper/relation.js");

exports.addViews = async (req, res) => {
  const { idPelatihan, view } = req.body;

  try {
    const iduser = req.userId;
    
    const user = await Views.findOne({ where: { id_user: iduser } });
    const pelatihanId = await Views.findOne({ where: { id_pelatihan : idPelatihan } });

    if (user && pelatihanId) {
      return res.status(400).json({ msg: "You have already View before" });
    }

    if (view > 1) {
      return res.status(403).json({ msg: "rating tidak boleh lebih dari 1" });
    }

    const views = await Views.create({
      id_user: iduser,
      id_pelatihan: idPelatihan,
      view,
    });

    res.status(201).json({ mgs: "view berhasil dibuat ", views });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getAllViews = async (req, res) => {
  try {
    const response = await Views.findAll();

    res.status(200).json({ msg: "ok", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getAllViewsByIdPelatihan = async (req, res) => {
  try {
    const viewsCount = await Views.count({
      where: {
        id_pelatihan: req.params.id_pelatihan,
      },
    });

    res.status(200).json({ msg: "ok", viewsCount });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getViewsByPelatihan = async (r) => {
  //   try {
  //   } catch (error) {
  //     res.status(500).json({ msg: error.message });
  //   }
};

exports.deleteViews = async () => {};
