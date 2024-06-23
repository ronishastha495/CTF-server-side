const jwt = require("jsonwebtoken");
const UserModel = require("../users/userModel");
const config = require("../config/config");
const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(403).send("No token provided.");
      }
      jwt.verify(token, config.jwtSecret, async (err, decoded) => {
        console.error("JWT Verification Error:", err);
        if (err) {
          return res.status(403).send("Failed to authenticate token.");
        }
        console.log("Decoded Token:", decoded); // Log the decoded token
        const userRole = decoded.role; // Assuming the role is stored in the token
        console.log("User Role:", userRole);
        const user = await UserModel.findById(decoded.sub);
        if (!user || user.role !== requiredRole) {
          return res
            .status(403)
            .send(`Forbidden: You do not have the required role.`);
        }
        next();
      });
    } catch (error) {
      console.error("Unexpected Error During JWT Verification:", error);
    }
  };
};

module.exports = checkUserRole;
