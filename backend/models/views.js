'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Views extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Views.init({
    id_user: DataTypes.INTEGER,
    id_pelatihan: DataTypes.INTEGER,
    view: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Views',
  });
  return Views;
};