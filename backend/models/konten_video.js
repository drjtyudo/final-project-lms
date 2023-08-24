'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class konten_video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  konten_video.init({
    judul_video: DataTypes.STRING,
    id_sub_module: DataTypes.INTEGER,
    link_youtube: DataTypes.STRING,
    video: DataTypes.STRING,
    video_url: DataTypes.STRING,
    durasi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'konten_video',
  });
  return konten_video;
};