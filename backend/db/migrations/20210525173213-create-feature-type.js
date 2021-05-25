'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FeatureTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      printerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Printers' }
      },
      featureId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'FeatureTypes' }
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
    return queryInterface.dropTable('FeatureTypes');
  }
};
