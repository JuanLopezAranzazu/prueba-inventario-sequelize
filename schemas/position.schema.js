const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();

const createPositionSchema = Joi.object({
  name: name.required(),
});

const updatePositionSchema = Joi.object({
  name: name,
});

const getPositionSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPositionSchema,
  updatePositionSchema,
  getPositionSchema,
};
