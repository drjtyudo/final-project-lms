const {
  Transaction,
  Pelatihan,
  PelatihanSaya,
} = require("../helper/relation.js");

exports.getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: { model: Pelatihan, as: "Pelatihan" },
    });
    res.status(200).json({ msg: "success", transactions });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id },
      include: { model: Pelatihan, as: "Pelatihan" },
    });
    res.status(200).json({ msg: "success", transaction });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createTransaction = async (req, res) => {
    const id_user = req.userId
  try {
    const dataPelatihan = await Pelatihan.findOne({
      where: { id: req.body.id_pelatihan },
    });
    let id_pelatihan = dataPelatihan.id;
    let masa_lisensi = dataPelatihan.masa_lisensi;
    let harga = dataPelatihan.harga;

    const newTransaction = await Transaction.create({
      id_user,
      id_pelatihan,
      masa_lisensi,
      harga,
      status: false,
    });
    res.status(201).json({ msg: "transaction added", yourTransaction: newTransaction });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.PayPelatihan = async (req, res) => {
    try {
      const { transactionId } = req.params;
  
      const transaction = await Transaction.findOne({
        where: { id: transactionId },
        include: { model: Pelatihan, as: "Pelatihan" },
      });
  
      if (!transaction) {
        return res.status(404).json({ msg: "Transaction not found" });
      }
  
      const existingPelatihanSaya = await PelatihanSaya.findOne({
        where: {
          id_user: transaction.id_user,
          id_pelatihan: transaction.id_pelatihan,
        },
      });
  
      if (existingPelatihanSaya) {
        return res.status(400).json({ msg: "Pelatihan already purchased" });
      }
  
      transaction.status = true;
      await transaction.save();
  
      const pelatihanSayaData = {
        id_user: transaction.id_user,
        id_pelatihan: transaction.id_pelatihan,
        progress: 0,
        diakses: new Date(),
        status: "Uncomplated",
        selesai: null,
      };
  
      await PelatihanSaya.create(pelatihanSayaData);
  
      res
        .status(200)
        .json({ msg: "Payment successful", Pelatihan: pelatihanSayaData });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
