const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(morgan("dev"));

  //All defined endpoints
  require("./route")(app);

  //All undefined endpoints
  app.use((req, res, next) => {
    const error = new Error("Page not found!");
    error.status = 404;
    next(error);
  });

  //All unhandled errors
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      message: error.message,
    });
  });
}
