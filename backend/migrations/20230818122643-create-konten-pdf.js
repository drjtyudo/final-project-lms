"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Konten_pdfs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judul_file: {
        type: Sequelize.STRING,
      },
      id_sub_module: {
        type: Sequelize.INTEGER,
      },
      linkGdrive: {
        type: Sequelize.STRING,
      },
      pdf: {
        type: Sequelize.STRING,
      },
      pdf_url: {
        type: Sequelize.STRING,
      },
      durasi: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Konten_pdfs");
  },
};
