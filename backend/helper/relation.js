const sequelize = require("../models/index.js").sequelize;
const { DataTypes } = require("sequelize");

const Users = require("../models/users.js")(sequelize, DataTypes);
const Kategori = require("../models/kategori.js")(sequelize, DataTypes);
const Module = require("../models/module.js")(sequelize, DataTypes);
const SubModule = require("../models/sub_module.js")(sequelize, DataTypes);
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
const KontenVideo = require("../models/konten_video.js")(sequelize, DataTypes);
const KontenPPT = require("../models/konten_ppt.js")(sequelize, DataTypes);
const KontenPembahasan = require("../models/konten_tambah_pembahasan.js")(
  sequelize,
  DataTypes
);
const Views = require("../models/views.js")(sequelize, DataTypes);
const Transaction = require("../models/transaction.js")(sequelize, DataTypes);
const PelatihanSaya = require("../models/pelatihan_saya.js")(
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

Pelatihan.hasMany(Module, {
  foreignKey: "id_pelatihan",
  as: "Modules",
});

Module.hasMany(SubModule, {
  foreignKey: "id_module",
  as: "SubModules",
});

SubModule.hasMany(KontenPdf , {
  foreignKey : "id_sub_module",
  as: "KontenPdfs"
})

SubModule.hasMany(KontenPPT , {
  foreignKey : "id_sub_module",
  as: "KontenPPTs"
})

SubModule.hasMany(KontenPembahasan , {
  foreignKey : "id_sub_module",
  as: "KontenPembahasans"
})

SubModule.hasMany(KontenVideo , {
  foreignKey : "id_sub_module",
  as: "KontenVideos"
})

// KontenPdf.belongsTo(SubModule, {
//   foreignKey: "id_sub_module",
//   as: "Konten_pdfs",
// });

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

PelatihanKategori.belongsTo(Kategori, {
  foreignKey: "id_kategori",
  as: "Kategori_ids",
});

PelatihanKategori.belongsTo(Pelatihan, {
  foreignKey: "id_Pelatihan",
  as: "Pelatihan_ids",
});

SubModule.belongsTo(Module, {
  foreignKey: "id_module",
  as: "Modules",
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


KontenVideo.belongsTo(SubModule, {
  foreignKey: "id_sub_module",
  as: "Konten_videos",
});

KontenPPT.belongsTo(SubModule, {
  foreignKey: "id_sub_module",
  as: "Konten_ppts",
});

KontenPembahasan.belongsTo(SubModule, {
  foreignKey: "id_sub_module",
  as: "Konten_pembahasans",
});

Pelatihan.hasMany(Views, {
  foreignKey: "id_pelatihan",
  as: "Views",
});

Transaction.belongsTo(Pelatihan, {
  foreignKey: "id_pelatihan",
  as: "Pelatihan",
});
Pelatihan.hasMany(Transaction, {
  foreignKey: "id_pelatihan",
  as: "Transactions",
});

PelatihanSaya.belongsTo(Pelatihan, {
  foreignKey: "id_pelatihan",
  as: "Pelatihan",
});

Pelatihan.hasMany(PelatihanSaya, {
  foreignKey: "id_pelatihan",
  as: "PelatihanSayas",
});

Users.hasMany(PelatihanSaya, {
  foreignKey: "id_user",
  as: "PelatihanSaya",
});

PelatihanSaya.belongsTo(Users, {
  foreignKey: "id_user",
  as: "User",
});

module.exports = {
  Iklan,
  Users,
  Kategori,
  Module,
  SubModule,
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
  PelatihanKategori,
  Transaction,
  PelatihanSaya,
};
