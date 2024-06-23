const express = require("express");
const { createCTF } = require("./ctfController");

const ctfRouter = express.Router();

ctfRouter.post("/", createCTF);

module.exports = ctfRouter;