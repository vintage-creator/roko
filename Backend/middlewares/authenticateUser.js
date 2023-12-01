const jwt = require("jsonwebtoken");
const UserReg = require("../models/userReg");

const authenticateUser = (roles) => {
  return async (req, res, next) => {
    try {
      // Extract token from request header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized access' });
      }
      const authToken = authHeader.split(' ')[1];

      // Verify the JWT token
      if (!authToken) {
        return res.status(401).json({ error: "Unauthorized access, token missing" });
      }

      const decodedToken = jwt.verify(authToken, process.env.Secret_ID);

      // Check user role
      if (!roles.includes(decodedToken.role)) {
        return res.status(403).json({ error: "Forbidden, insufficient user role" });
      }

      // Attach user information to the request object
      req.user = await UserReg.findById(decodedToken.userId).exec();

      // Proceed to next middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Invalid token or unauthorized access" });
    }
  };
};

module.exports = authenticateUser;
