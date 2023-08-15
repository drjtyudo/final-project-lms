'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Footer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Footer.init({
    id_judul_footer: DataTypes.INTEGER,
    nama_footer: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    link: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Footer',
  });
  return Footer;
};