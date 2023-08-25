'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class konten_tambah_pembahasan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  konten_tambah_pembahasan.init({
    judul_pembahasan: DataTypes.STRING,
    id_sub_module: DataTypes.INTEGER,
    deskripsi: DataTypes.TEXT,
    durasi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'konten_tambah_pembahasan',
  });
  return konten_tambah_pembahasan;
};