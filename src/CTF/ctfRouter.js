const express = require("express");
const { createCTF, getCTF, getCTFByTopic } = require("./ctfController");
const { authenticateToken, isAdmin } = require("../middlewares/authHandle");

const ctfRouter = express.Router();

ctfRouter.post("/create", authenticateToken, isAdmin, createCTF);
ctfRouter.get("/getAllCTF", authenticateToken, isAdmin, getCTF);
ctfRouter.get(
  "/getAllCTFByTopic/:id",
  authenticateToken,
  isAdmin,
  getCTFByTopic
);

module.exports = ctfRouter;
