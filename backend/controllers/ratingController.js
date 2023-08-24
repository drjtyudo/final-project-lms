const { Rating } = require("../helper/relation.js");

exports.getRating = async (req, res) => {
  try {
    const response = await Rating.findAll({
      attributes: ["id", "rating", "id_user", "id_pelatihan"],
    });
    res.status(200).json({ msg: "success get all rating", ratings: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getRatingByIdPelatihan = async (req, res) => {
  try {
    const id_pelatihan = req.params.id_pelatihan;

    const totalRating = await Rating.sum("rating", { where: { id_pelatihan } });
    const ratingsCount = await Rating.count({ where: { id_pelatihan } });

    if (ratingsCount === 0) {
      return res
        .status(400)
        .json({ msg: "No ratings available for this training" });
    }

    const averageRating = totalRating / ratingsCount;
    const roundedAverage = parseFloat(averageRating.toFixed(1));

    res.status(200).json({
      msg: "Success",
      id_pelatihan,
      ratingsCount,
      totalRating,
      averageRating: roundedAverage,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createRating = async (req, res) => {
  const { rating, id_pelatihan } = req.body;

  try {
    const id_user = req.userId;

    const user = await Rating.findOne({ where: { id_user: id_user } });
    const pelatihanId = await Rating.findOne({ where: { id_pelatihan } });

    if (user && pelatihanId) {
      return res.status(400).json({ msg: "You have already reted before" });
    }

    if (rating > 5) {
      return res.status(403).json({ msg: "rating tidak boleh lebih dari 5" });
    }

    await Rating.create({
      id_user,
      id_pelatihan,
      rating,
    });

    res.status(201).json({ msg: "Success send rating" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateRating = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { rating } = req.body;

  try {
    const existingRating = await Rating.findByPk(id);

    if (!existingRating) {
      return res.status(404).json({ msg: "Rating not found" });
    }

    if (existingRating.id_user !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to update this rating" });
    }

    existingRating.rating = rating;
    await existingRating.save();

    res.status(200).json({ msg: "Rating updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteRating = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const rating = await Rating.findByPk(id);

    if (!rating) {
      return res.status(404).json({ msg: "Rating not found" });
    }

    if (rating.id_user !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to delete this rating" });
    }

    await rating.destroy();

    res.status(200).json({ msg: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
