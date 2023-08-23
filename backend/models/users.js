"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      id_user: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      fullname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.TEXT,
      nomor_telp: DataTypes.STRING,
      tggl_lahir: DataTypes.DATE,
      negara: DataTypes.STRING,
      domisili: DataTypes.STRING,
      profile_image: DataTypes.TEXT,
      url_image: DataTypes.TEXT,
      id_google: DataTypes.STRING,
      id_facebook: DataTypes.STRING,
      refresh_token: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
