const sequelize = require("../models/index.js").sequelize;
const { DataTypes } = require("sequelize");

const Kategori = require("../models/kategori.js")(sequelize, DataTypes);
const Module = require("../models/module.js")(sequelize, DataTypes);
const Materi = require("../models/materi.js")(sequelize, DataTypes);
const Pelatihan = require("../models/pelatihan")(sequelize, DataTypes);
const Footer = require("../models/footer.js")(sequelize, DataTypes);
const JudulFooter = require("../models/judul_footer.js")(sequelize, DataTypes);

// Relation
Materi.belongsTo(Module, {
  foreignKey: "id_module",
  as: "Modules",
});

Module.hasMany(Materi, {
  foreignKey: "id_module",
  as: "Materis",
});


JudulFooter.hasMany(Footer, {
  foreignKey: "id_judul_footer", // Atur sesuai dengan kolom yang menghubungkan antara tabel JudulFooter dan Footer
  as: "Footers",
  onDelete: "CASCADE",
});

module.exports = { Kategori, Module, Materi , Pelatihan , JudulFooter, Footer };
