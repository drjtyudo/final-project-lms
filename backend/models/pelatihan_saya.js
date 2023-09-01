'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pelatihan_saya extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pelatihan_saya.init({
    id_user: DataTypes.STRING,
    id_pelatihan: DataTypes.INTEGER,
    diakses: DataTypes.DATE,
    status: DataTypes.ENUM("Uncomplated", "Complated"),
    selesai: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'pelatihan_saya',
  });
  return pelatihan_saya;
};