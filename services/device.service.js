const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class DeviceService {
  constructor() {}

  async findAll() {
    const devices = await models.Device.findAll({
      include: [{ model: models.Employee, as: "employees" }],
    });
    return devices;
  }

  async findOne(id) {
    const device = await models.Device.findOne({
      where: { id },
      include: [{ model: models.Employee, as: "employees" }],
    });
    if (!device) throw boom.notFound(`Device #${id} not found`);
    return device;
  }

  async create(payload) {
    const savedDevice = await models.Device.create(payload);
    return savedDevice;
  }

  async update(id, payload) {
    const device = await this.findOne(id);
    if (!device) throw boom.notFound(`Device #${id} not found`);
    const updatedDevice = await device.update(payload);
    return updatedDevice;
  }

  async delete(id) {
    const device = await this.findOne(id);
    if (!device) throw boom.notFound(`Device #${id} not found`);
    await device.destroy();
    return id;
  }
}

module.exports = DeviceService;
