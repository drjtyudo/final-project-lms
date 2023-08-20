'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class judul_footer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  judul_footer.init({
    judul_footer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'judul_footer',
  });
  return judul_footer;
};