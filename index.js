const express = require("express");
const app = express();
const { config } = require("./config/config");
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = require("./routes/index");
routes(app);

const {
  errorHandler,
  boomErrorHandler,
  logErrors,
} = require("./middleware/error.handler");
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running in port ${port}`));
