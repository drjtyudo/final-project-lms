'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentar_reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  commentar_reply.init({
    komentar: DataTypes.TEXT,
    id_commentar: DataTypes.INTEGER,
    id_user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'commentar_reply',
  });
  return commentar_reply;
};