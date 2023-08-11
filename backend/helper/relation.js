const sequelize = require("../models/index.js").sequelize;
const { DataTypes } = require("sequelize");

const Kategori = require("../models/kategori.js")(sequelize, DataTypes);
const Module = require("../models/module.js")(sequelize, DataTypes);
const Materi = require("../models/materi.js")(sequelize, DataTypes);
const Pelatihan = require("../models/pelatihan")(sequelize, DataTypes);
const PelatihanKategori = require("../models/pelatihankategori.js")(
  sequelize,
  DataTypes
);

// Relation

Kategori.belongsToMany(Pelatihan, {
  through: PelatihanKategori,
  foreignKey: "id_kategori",
  as: "Pelatihans",
});

Pelatihan.belongsToMany(Kategori, {
  through: PelatihanKategori,
  foreignKey: "id_pelatihan",
  as: "Kategoris",
});

Materi.belongsTo(Module, {
  foreignKey: "id_module",
  as: "Modules",
});

Module.hasMany(Materi, {
  foreignKey: "id_module",
  as: "Materis",
});

module.exports = { Kategori, Module, Materi, Pelatihan };
