const { Employee, EmployeeSchema } = require("./employee.model");
const { Position, PositionSchema } = require("./position.model");
const { Device, DeviceSchema } = require("./device.model");

function models(sequelize) {
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Position.init(PositionSchema, Position.config(sequelize));
  Device.init(DeviceSchema, Device.config(sequelize));
  Employee.associate(sequelize.models);
  Position.associate(sequelize.models);
  Device.associate(sequelize.models);
}

module.exports = models;
