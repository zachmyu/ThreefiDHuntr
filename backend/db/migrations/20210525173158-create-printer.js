'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Printers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand: {
        allowNull: false,
        type: Sequelize.STRING
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      retailPrice: {
        allowNull: false,
        type: Sequelize.INTEGER[8, 2]
      },
      videoUrl: {
        unique: true,
        type: Sequelize.STRING
      },
      pictureUrl: {
        unique: true,
        type: Sequelize.STRING
      },
      retailStatus: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Printers');
  }
};
