"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Pelatihans",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        judul: {
          type: Sequelize.STRING,
        },
        deskripsi: {
          type: Sequelize.TEXT,
        },
        harga: {
          type: Sequelize.DECIMAL,
        },
        dibuat_oleh: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.ENUM("free", "paid"),
        },
        dibuat_oleh: {
          type: Sequelize.STRING,
        },
        level: {
          type: Sequelize.ENUM(
            "pemula",
            "menengah",
            "lanjut",
            "beginner",
            "intermediate",
            "advance "
          ),
        },
        level: {
          type: Sequelize.ENUM(
            "pemula",
            "menengah",
            "lanjut",
            "beginner",
            "intermediate",
            "advance "
            ),
          },
          status_terbit: {
            type: Sequelize.ENUM("draf", "terbit"),
          },
          tanggal_terbit: {
            type: Sequelize.DATE,
          },
        image: {
          type: Sequelize.STRING,
        },
        image_url: {
          type: Sequelize.STRING,
        },
        masa_lisensi: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        freezeTableName: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pelatihans");
  },
};
