"use strict";

const { DEVICE, DeviceSchema } = require("./../models/device.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DEVICE, DeviceSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.drop(DEVICE);
  },
};
