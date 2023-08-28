'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Konten_pdf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Konten_pdf.init({
    judul_file: DataTypes.STRING,
    id_sub_module: DataTypes.INTEGER,
    linkGdrive: DataTypes.STRING,
    pdf: DataTypes.STRING,
    pdf_url : DataTypes.STRING,
    durasi :DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Konten_pdf',
  });
  return Konten_pdf;
};