const sequelize = require("../models/index").sequelize;
const { DataTypes } = require("sequelize");

// models
const Pelatihan = require("../models/pelatihan")(sequelize, DataTypes);

//  realtion

module.exports = { Pelatihan };
