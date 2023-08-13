"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kategori.init(
    {
      kategori: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
      image_logo: DataTypes.TEXT,
      url_image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Kategori",
    }
  );
  return Kategori;
};
