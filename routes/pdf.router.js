const express = require("express");
const pdfRouter = express.Router();

const pdfService = require("../services/pdf.service");

pdfRouter.get("/", async (req, res, next) => {
  try {
    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment;filename=invoice.pdf`,
    });
    pdfService.buildPdf(
      (chunk) => stream.write(chunk),
      () => stream.end()
    );
  } catch (error) {
    next(error);
  }
});

module.exports = pdfRouter;
