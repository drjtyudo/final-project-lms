"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pelatihan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pelatihan.init(
    {
      image: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
      judul: {
        type: DataTypes.STRING,
      },
      harga: {
        type: DataTypes.DECIMAL,
      },
      deskripsi: {
        type: DataTypes.TEXT,
      },
      watching: {
        type: DataTypes.INTEGER,
      },
      dibuat_oleh: {
        type: DataTypes.STRING,
      },
      untuk: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Pelatihan",
    }
  );
  return Pelatihan;
};
