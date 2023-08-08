const sequelize = require("../models/index.js").sequelize;
const { DataTypes } = require("sequelize");

const Kategori = require("../models/kategori.js")(sequelize, DataTypes);
const Module = require("../models/module.js")(sequelize, DataTypes);
const Materi = require("../models/materi.js")(sequelize, DataTypes);

// Relation
Materi.belongsTo(Module, {
  foreignKey: "id_module",
  as: "Modules",
});

Module.hasMany(Materi, {
  foreignKey: "id_module",
  as: "Materis",
});

module.exports = { Kategori, Module, Materi };
