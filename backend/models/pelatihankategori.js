'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PelatihanKategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PelatihanKategori.init({
    id_pelatihan: DataTypes.INTEGER,
    id_kategori: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PelatihanKategori',
  });
  return PelatihanKategori;
};