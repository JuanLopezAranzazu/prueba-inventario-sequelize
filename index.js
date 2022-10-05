const express = require("express");
const app = express();
const { config } = require("./config/config");
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes employee
const { models } = require("./libs/sequelize");

app.get("/api/v1/employees", async (req, res, next) => {
  try {
    const employees = await models.Employee.findAll({
      include: [
        { model: models.Position, as: "position" },
        { model: models.Device, as: "devices" },
      ],
    });
    console.log(employees);
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/employees", async (req, res, next) => {
  try {
    const { body: dataForEmployee } = req;
    console.log(dataForEmployee);
    const savedEmployee = await models.Employee.create(dataForEmployee);
    console.log(savedEmployee);
    res.status(201).json(savedEmployee);
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/positions", async (req, res, next) => {
  try {
    const positions = await models.Position.findAll({
      include: [{ model: models.Employee, as: "employees" }],
    });
    console.log(positions);
    res.status(200).json(positions);
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/devices", async (req, res, next) => {
  try {
    const devices = await models.Device.findAll({
      include: [{ model: models.Employee, as: "employees" }],
    });
    console.log(devices);
    res.status(200).json(devices);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Server running in port ${port}`));
