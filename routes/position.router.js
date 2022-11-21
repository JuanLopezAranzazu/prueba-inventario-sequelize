const express = require("express");
const positionRouter = express.Router();

const PositionService = require("../services/position.service");
const positionService = new PositionService();
const validatorHandler = require("./../middleware/validator.handler");
const {
  createPositionSchema,
  updatePositionSchema,
  getPositionSchema,
} = require("./../schemas/position.schema");

positionRouter.get("/", async (req, res, next) => {
  try {
    const positions = await positionService.findAll();
    res.status(200).json(positions);
  } catch (error) {
    next(error);
  }
});

positionRouter.get(
  "/:id",
  validatorHandler(getPositionSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const position = await positionService.findOne(id);
      res.status(200).json(position);
    } catch (error) {
      next(error);
    }
  }
);

positionRouter.post(
  "/",
  validatorHandler(createPositionSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const savedPosition = await positionService.create(body);
      res.status(201).json(savedPosition);
    } catch (error) {
      next(error);
    }
  }
);

positionRouter.put(
  "/:id",
  validatorHandler(getPositionSchema, "params"),
  validatorHandler(updatePositionSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const updatedPosition = await positionService.update(id, body);
      res.status(200).json(updatedPosition);
    } catch (error) {
      next(error);
    }
  }
);

positionRouter.delete(
  "/:id",
  validatorHandler(getPositionSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const positionId = await positionService.delete(id);
      res.status(204).json(positionId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = positionRouter;
