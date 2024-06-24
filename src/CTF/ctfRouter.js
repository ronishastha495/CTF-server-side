const express = require("express");
const { createCTF, getCTF } = require("./ctfController");

const ctfRouter = express.Router();

ctfRouter.post("/create", createCTF);
ctfRouter.get("/getAllCTF", getCTF);

module.exports = ctfRouter;
