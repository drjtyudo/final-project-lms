"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pelatihan_sayas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.STRING,
      },
      id_pelatihan: {
        type: Sequelize.INTEGER,
      },
      progress: {
        type: Sequelize.INTEGER,
      },
      diakses: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM("Uncomplated", "Complated"),
      },
      selesai: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("pelatihan_sayas");
  },
};
