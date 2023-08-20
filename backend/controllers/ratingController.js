const { Rating } = require("../helper/relation.js");

exports.getRating = async (req, res) => {
  try {
    const totalRating = await Rating.sum("rating");
    const ratingsCount = await Rating.count();

    if (ratingsCount === 0) {
      return res.status(200).json({ msg: "No ratings available" });
    }

    const averageRating = totalRating / ratingsCount;
    const roundedAverage = parseFloat(averageRating.toFixed(1)); // untuk membulatkan

    res.status(200).json({
      msg: "Success",
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

    const existinngUser = await Rating.findOne({ where: { id_user: id_user } });

    if (existinngUser) {
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
