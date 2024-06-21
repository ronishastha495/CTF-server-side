const app = require("express")();

// Routes
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to CTN.." });
});

module.exports = app;
