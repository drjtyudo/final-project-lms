const sequelize = require("../models/index.js").sequelize;
const { DataTypes } = require("sequelize");

const Users = require("../models/users.js")(sequelize, DataTypes);
const Kategori = require("../models/kategori.js")(sequelize, DataTypes);
const Module = require("../models/module.js")(sequelize, DataTypes);
const Materi = require("../models/materi.js")(sequelize, DataTypes);
const Pelatihan = require("../models/pelatihan")(sequelize, DataTypes);
const Rating = require("../models/rating.js")(sequelize, DataTypes);
const Commentar = require("../models/commentar.js")(sequelize, DataTypes);
const Commentar_reply = require("../models/commentar_reply.js")(
  sequelize,
  DataTypes
);
const Footer = require("../models/footer.js")(sequelize, DataTypes);
const JudulFooter = require("../models/judul_footer.js")(sequelize, DataTypes);
const PelatihanKategori = require("../models/pelatihankategori.js")(
  sequelize,
  DataTypes
);

// Relation

Rating.belongsTo(Users, {
  foreignKey: "id_user",
  as: "User",
});

Rating.belongsTo(Pelatihan, {
  foreignKey: "id_pelatihan",
  as: "Pelatihan",
});

Users.hasMany(Rating, {
  foreignKey: "id_user",
  as: "Ratings",
});

Pelatihan.hasMany(Rating, {
  foreignKey: "id_pelatihan",
  as: "Ratings",
});

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

Commentar.hasMany(Commentar_reply, {
  foreignKey: "id_commentar",
  as: "Replies",
});

Commentar_reply.belongsTo(Commentar, {
  foreignKey: "id_commentar",
  as: "Commentar",
});

JudulFooter.hasMany(Footer, {
  foreignKey: "id_judul_footer",
  as: "Footers",
  onDelete: "CASCADE",
});

module.exports = {
  Users,
  Kategori,
  Module,
  Materi,
  Pelatihan,
  Rating,
  Commentar,
  Commentar_reply,
  JudulFooter,
  Footer,
};
