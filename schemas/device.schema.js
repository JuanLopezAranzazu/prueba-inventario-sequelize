const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();

const createDeviceSchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

const updateDeviceSchema = Joi.object({
  name: name,
  description: description,
});

const getDeviceSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createDeviceSchema,
  updateDeviceSchema,
  getDeviceSchema,
};
