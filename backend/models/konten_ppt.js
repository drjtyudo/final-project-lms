'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class konten_ppt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  konten_ppt.init({
    judul_ppt: DataTypes.STRING,
    id_sub_module: DataTypes.INTEGER,
    linkGdrive: DataTypes.STRING,
    ppt: DataTypes.STRING,
    ppt_url: DataTypes.STRING,
    durasi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'konten_ppt',
  });
  return konten_ppt;
};