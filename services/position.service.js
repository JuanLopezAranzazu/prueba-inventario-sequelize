const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class PositionService {
  constructor() {}

  async findAll() {
    const positions = await models.Position.findAll({
      include: [{ model: models.Employee, as: "employees" }],
    });
    return positions;
  }

  async findOne(id) {
    const position = await models.Position.findOne({
      where: { id },
      include: [{ model: models.Employee, as: "employees" }],
    });
    if (!position) throw boom.notFound(`Position #${id} not found`);
    return position;
  }

  async create(payload) {
    const savedPosition = await models.Position.create(payload);
    return savedPosition;
  }

  async update(id, payload) {
    const position = await this.findOne(id);
    if (!position) throw boom.notFound(`Position #${id} not found`);
    const updatedPosition = await position.update(payload);
    return updatedPosition;
  }

  async delete(id) {
    const position = await this.findOne(id);
    if (!position) throw boom.notFound(`Position #${id} not found`);
    await position.destroy();
    return id;
  }
}

module.exports = PositionService;
