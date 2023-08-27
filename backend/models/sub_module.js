"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Materi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Materi.init(
    {
      id_module: DataTypes.INTEGER,
      judul: DataTypes.STRING,
      penerbit: DataTypes.TEXT,
      status: DataTypes.ENUM('draf' , 'terbit'),
      penerbitan : DataTypes.DATE
    },
    {
      sequelize,
      modelName: "sub_module",
    }
  );
  return Materi;
};

