"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sub_modules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_module: {
        type: Sequelize.INTEGER,
      },
      judul: {
        type: Sequelize.STRING,
      },
      penerbit: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('draf' , 'terbit'),
      },
      penerbitan: {
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
    await queryInterface.dropTable("sub_modules");
  },
};
