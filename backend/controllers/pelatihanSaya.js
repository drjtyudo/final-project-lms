const { PelatihanSaya, Pelatihan } = require("../helper/relation.js");

exports.getPelatihanSaya = async (req, res) => {
  try {
    const userId = req.params.userId;

    const response = await PelatihanSaya.findAll({
      where: { id_user: userId },
      include: { model: Pelatihan, as: "Pelatihan" },
    });

    res.status(200).json({ msg: "success", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// exports.createPelatihanSaya = async (req,res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }
