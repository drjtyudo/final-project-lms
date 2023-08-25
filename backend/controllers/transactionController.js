const { Transaction, Pelatihan } = require("../helper/relation.js");

exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findAll({});
    res.status(200).json({ msg: "success", transaction });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const dataPelatihan = await Pelatihan.findOne({
      where: { id: req.body.id_pelatihan },
    });
    let id_pelatihan = dataPelatihan.id;
    let masa_lisensi = dataPelatihan.masa_lisensi;
    let harga = dataPelatihan.harga;

    await Transaction.create({
      id_user: "uid-yye8",
      id_pelatihan,
      masa_lisensi,
      harga,
      status: "belum bayar",
    });
    res.status(201).json({ msg: "transaction added" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
