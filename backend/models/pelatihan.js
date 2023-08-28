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
      judul: {
        type: DataTypes.STRING,
      },
      deskripsi: {
        type: DataTypes.TEXT,
      },
      harga: {
        type: DataTypes.DECIMAL,
      },
      dibuat_oleh: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("free", "paid"),
      },
      level: {
        type: DataTypes.ENUM(
          "pemula",
          "menengah",
          "lanjut",
          "beginner",
          "intermediate",
          "advance "
        ),
      },
      status_terbit: {
        type: DataTypes.ENUM("draf", "terbit"),
      },
      tanggal_terbit: {
        type: DataTypes.DATE,
      },
      image: {
        type: DataTypes.STRING,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      masa_lisensi: {
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
