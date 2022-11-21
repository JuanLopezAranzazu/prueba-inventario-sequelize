const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class EmployeeService {
  constructor() {}

  async findAll() {
    const employees = await models.Employee.findAll({
      include: [
        { model: models.Position, as: "position" },
        { model: models.Device, as: "devices" },
      ],
    });
    return employees;
  }

  async findOne(id) {
    const employee = await models.Employee.findOne({
      where: { id },
      include: [
        { model: models.Position, as: "position" },
        { model: models.Device, as: "devices" },
      ],
    });
    if (!employee) throw boom.notFound(`Employee #${id} not found`);
    return employee;
  }

  async create(payload) {
    const savedEmployee = await models.Employee.create(payload);
    return savedEmployee;
  }

  async update(id, payload) {
    const employee = await this.findOne(id);
    if (!employee) throw boom.notFound(`Employee #${id} not found`);
    const updatedEmployee = await employee.update(payload);
    return updatedEmployee;
  }

  async delete(id) {
    const employee = await this.findOne(id);
    if (!employee) throw boom.notFound(`Employee #${id} not found`);
    await employee.destroy();
    return id;
  }
}

module.exports = EmployeeService;
