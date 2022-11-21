const PdfDocument = require("pdfkit");
const EmployeeService = require("../services/employee.service");
const employeeService = new EmployeeService();

function generateTableRow(doc, y, c1, c2, c3) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 280, y, { width: 150, align: 'right' })
    .text(c3, 0, y, { align: 'right' });
}

function generateEmployeeTable(doc, employees) {
  let employeeTableTop = 10;

  for (let index = 0; index < employees.length; index++) {
    const employee = employees[index];
    const { name, email, contact_number } = employee;
    const position = employeeTableTop + (index + 1) * 30;
    generateTableRow(doc, position, name, email, contact_number);
  }
}

async function buildPdf(dataCallback, endCallback) {
  const doc = new PdfDocument({ bufferPages: true, font: "Courier" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  const employees = await employeeService.findAll();
  generateEmployeeTable(doc, employees);

  doc.end();
}

module.exports = { buildPdf };
