const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const ctfModel = require("./ctfModel");
const config = require("../config/config");

const createCTF = async (req, res, next) => {
    const { topic, introduction, email, password } = req.body;
};
