'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class iklan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  iklan.init({
    banner_image: DataTypes.STRING,
    url_image: DataTypes.STRING,
    judul: DataTypes.STRING,
    deskripsi: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'iklan',
  });
  return iklan;
};