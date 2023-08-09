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
        image: {
          type: Sequelize.STRING,
        },
        url: {
          type: Sequelize.STRING,
        },
        judul: {
          type: Sequelize.STRING,
        },
        harga: {
          type: Sequelize.DECIMAL,
        },
        deskripsi: {
          type: Sequelize.TEXT,
        },
        watching: {
          type: Sequelize.INTEGER,
        },
        dibuat_oleh: {
          type: Sequelize.STRING,
        },
        untuk: {
          type: Sequelize.STRING,
        },
        id_kategori: {
          type: Sequelize.INTEGER,
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
