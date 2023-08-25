const sequelize = require("../models/index.js").sequelize;
const { DataTypes } = require("sequelize");

const Users = require("../models/users.js")(sequelize, DataTypes);
const Kategori = require("../models/kategori.js")(sequelize, DataTypes);
const Module = require("../models/module.js")(sequelize, DataTypes);
const subModule = require("../models/sub_module.js")(sequelize, DataTypes);
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
const Iklan = require("../models/iklan.js")(sequelize, DataTypes);
const KontenPdf = require("../models/konten_pdf.js")(sequelize, DataTypes);
const KontenVideo = require('../models/konten_video.js')(sequelize, DataTypes)
const KontenPPT = require('../models/konten_ppt.js')(sequelize, DataTypes)
const KontenPembahasan = require('../models/konten_tambah_pembahasan.js')(sequelize, DataTypes)
const Views = require('../models/views.js')(sequelize, DataTypes)
const Transaction = require("../models/transaction.js")(sequelize, DataTypes)

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

subModule.belongsTo(Module, {
  foreignKey: "id_module",
  as: "Modules",
});

Module.hasMany(subModule, {
  foreignKey: "id_module",
  as: "subModules",
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

KontenPdf.belongsTo(subModule, {
  foreignKey: "id_sub_module",
  as: "Konten_pdfs",
});

KontenVideo.belongsTo(subModule, {
  foreignKey: "id_sub_module",
  as: "Konten_videos",
});

KontenPPT.belongsTo(subModule, {
  foreignKey: "id_sub_module",
  as: "Konten_ppts",
});

KontenPembahasan.belongsTo(subModule, {
  foreignKey: "id_sub_module",
  as: "Konten_pembahasans",
});

Pelatihan.hasMany(Views, {
  foreignKey: "id_pelatihan",
  as: "Views",
});




module.exports = {
  Iklan,
  Users,
  Kategori,
  Module,
  subModule,
  Pelatihan,
  JudulFooter,
  Footer,
  KontenPdf,
  KontenVideo,
  KontenPPT,
  KontenPembahasan,
  Rating,
  Commentar,
  Commentar_reply,
  JudulFooter,
  Footer,
  Views,
  Transaction
};
