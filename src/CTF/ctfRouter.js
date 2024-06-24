const express = require("express");
const { createCTF, getCTF, getCTFByTopic } = require("./ctfController");

const ctfRouter = express.Router();

ctfRouter.post("/create", createCTF);
ctfRouter.get("/getAllCTF", getCTF);
ctfRouter.get("/getAllCTFByTopic/:id", getCTFByTopic);

module.exports = ctfRouter;
    