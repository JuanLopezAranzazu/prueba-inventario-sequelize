const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const email = Joi.string();
const contact_number = Joi.string();
const position_id = Joi.number().integer();

const createEmployeeSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  contact_number: contact_number.required(),
  position_id: position_id.required(),
});

const updateEmployeeSchema = Joi.object({
  name: name,
  email: email,
  contact_number: contact_number,
  position_id: position_id,
});

const getEmployeeSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createEmployeeSchema,
  updateEmployeeSchema,
  getEmployeeSchema,
};
