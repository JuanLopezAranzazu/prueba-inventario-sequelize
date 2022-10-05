"use strict";

const { POSITION, PositionSchema } = require("./../models/position.model");
const { EMPLOYEE, EmployeeSchema } = require("./../models/employee.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(POSITION, PositionSchema);
    await queryInterface.createTable(EMPLOYEE, EmployeeSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.drop(POSITION);
    await queryInterface.drop(EMPLOYEE);
  },
};
