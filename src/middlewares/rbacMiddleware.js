const jwt = require("jsonwebtoken");
const UserModel = require("../users/userModel");
const config = require("../config/config");

const checkUserRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const IdRequest = req.params.id;
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(403).send("No token provided.");
      }

      jwt.verify(token, config.jwtSecret, async (err, decoded) => {
        if (err) {
          return res.status(403).send("Failed to authenticate token.");
        }

        if (decoded.sub !== IdRequest) {
          return res.status(403).send("Token does not match the requested ID.");
        }

        const user = await UserModel.findById(decoded.sub);

        if (!user || user.role !== requiredRole) {
          return res.status(403).send("You do not have the required role.");
        }

        next();
      });
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  };
};

module.exports = checkUserRole;
