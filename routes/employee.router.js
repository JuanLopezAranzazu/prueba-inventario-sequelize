const express = require("express");
const employeeRouter = express.Router();

const EmployeeService = require("../services/employee.service");
const employeeService = new EmployeeService();
const validatorHandler = require("./../middleware/validator.handler");
const {
  createEmployeeSchema,
  updateEmployeeSchema,
  getEmployeeSchema,
} = require("./../schemas/employee.schema");

employeeRouter.get("/", async (req, res, next) => {
  try {
    const employees = await employeeService.findAll();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
});

employeeRouter.get(
  "/:id",
  validatorHandler(getEmployeeSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const employee = await employeeService.findOne(id);
      res.status(200).json(employee);
    } catch (error) {
      next(error);
    }
  }
);

employeeRouter.post(
  "/",
  validatorHandler(createEmployeeSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const savedEmployee = await employeeService.create(body);
      res.status(201).json(savedEmployee);
    } catch (error) {
      next(error);
    }
  }
);

employeeRouter.put(
  "/:id",
  validatorHandler(getEmployeeSchema, "params"),
  validatorHandler(updateEmployeeSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const updatedEmployee = await employeeService.update(id, body);
      res.status(200).json(updatedEmployee);
    } catch (error) {
      next(error);
    }
  }
);

employeeRouter.delete(
  "/:id",
  validatorHandler(getEmployeeSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const employeeId = await employeeService.delete(id);
      res.status(204).json(employeeId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = employeeRouter;
