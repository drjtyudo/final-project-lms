'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  commentar.init({
    komentar: DataTypes.TEXT,
    id_pelatihan: DataTypes.INTEGER,
    id_user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'commentar',
  });
  return commentar;
};