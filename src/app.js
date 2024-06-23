const app = require("express")();
const errorMiddleware = require("./middlewares/globalErrorHandler");

// Routes
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to CTN.." });
});

app.get("/home", (req, res, next) => {
  res.json({ message: "Welcome to Raja.." });
});

app.use(errorMiddleware());

module.exports = app;
