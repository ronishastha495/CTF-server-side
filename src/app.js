const app = require("express")();

// Routes
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to CTN.." });
});

app.get("/home", (req, res, next) => {
  res.json({ message: "Welcome to CTN home page" });
});

module.exports = app;
