const employeeRouter = require("./employee.router");
const pdfRouter = require("./pdf.router");

function routes(app) {
  app.use("/api/v1/employees", employeeRouter);
  app.use("/api/v1/pdf", pdfRouter);
}

module.exports = routes;
