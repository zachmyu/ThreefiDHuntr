'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PrinterFeatures', [
      { features: "FLM" },
      { features: "Resin" },
      { features: "CoreXY" },
      { features: "Multi-Filament" },
      { features: "Direct Drive" },
      { features: "Filament Runout Sensor" },
      { features: "Auto-levelling" },
      { features: "Enclosed" },
      { features: "Easily Moddable" },
      { features: "Heads Swappable" },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PrinterFeatures', null, {});
  }
};
