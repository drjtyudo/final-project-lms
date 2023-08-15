const sequelize = require("../models/index.js").sequelize;
const { DataTypes } = require("sequelize");

const Users = require("../models/users.js")(sequelize, DataTypes);
const Kategori = require("../models/kategori.js")(sequelize, DataTypes);
const Module = require("../models/module.js")(sequelize, DataTypes);
const Materi = require("../models/materi.js")(sequelize, DataTypes);
const Pelatihan = require("../models/pelatihan")(sequelize, DataTypes);
const Footer = require("../models/footer.js")(sequelize, DataTypes);
const JudulFooter = require("../models/judul_footer.js")(sequelize, DataTypes);
const PelatihanKategori = require("../models/pelatihankategori.js")(
  sequelize,
  DataTypes
);

// Relation

Kategori.belongsToMany(Pelatihan, {
  through: PelatihanKategori,
  foreignKey: "id_pelatihan",
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


JudulFooter.hasMany(Footer, {
  foreignKey: "id_judul_footer",
  as: "Footers",
  onDelete: "CASCADE",
});

module.exports = { Users, Kategori, Module, Materi , Pelatihan , JudulFooter, Footer };
