const express = require("express");
const deviceRouter = express.Router();

const DeviceService = require("../services/device.service");
const deviceService = new DeviceService();
const validatorHandler = require("./../middleware/validator.handler");
const {
  createDeviceSchema,
  updateDeviceSchema,
  getDeviceSchema,
} = require("./../schemas/device.schema");

deviceRouter.get("/", async (req, res, next) => {
  try {
    const devices = await deviceService.findAll();
    res.status(200).json(devices);
  } catch (error) {
    next(error);
  }
});

deviceRouter.get(
  "/:id",
  validatorHandler(getDeviceSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const device = await deviceService.findOne(id);
      res.status(200).json(device);
    } catch (error) {
      next(error);
    }
  }
);

deviceRouter.post(
  "/",
  validatorHandler(createDeviceSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const savevdDevice = await deviceService.create(body);
      res.status(201).json(savevdDevice);
    } catch (error) {
      next(error);
    }
  }
);

deviceRouter.put(
  "/:id",
  validatorHandler(getDeviceSchema, "params"),
  validatorHandler(updateDeviceSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const updatedDevice = await deviceService.update(id, body);
      res.status(200).json(updatedDevice);
    } catch (error) {
      next(error);
    }
  }
);

deviceRouter.delete(
  "/:id",
  validatorHandler(getDeviceSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const deviceId = await deviceService.delete(id);
      res.status(204).json(deviceId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = deviceRouter;
