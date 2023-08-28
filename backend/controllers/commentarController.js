const { Commentar, Commentar_reply } = require("../helper/relation.js");

// commentar
exports.getCommentar = async (req, res) => {
  try {
    const commentar = await Commentar.findAll({
      include: { model: Commentar_reply, as: "Replies" },
    });
    res.status(200).json({ msg: "success", commentar });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createCommentar = async (req, res) => {
  const { komentar, id_pelatihan } = req.body;
  try {
    const id_user = req.userId;
    await Commentar.create({
      komentar,
      id_user,
      id_pelatihan,
    });
    res.status(201).json({ msg: "commentar posted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// reply commentar
exports.getReplyCommentar = async (req, res) => {
  try {
    const commentarReply = await Commentar_reply.findAll({});
    res.status(200).json({ msg: "success", commentarReply });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createReply = async (req, res) => {
  const { komentar, id_commentar } = req.body;
  try {
    const id_user = req.userId;
    await Commentar_reply.create({
      komentar,
      id_user,
      id_commentar,
    });
    res.status(201).json({ msg: "reply commentar posted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
