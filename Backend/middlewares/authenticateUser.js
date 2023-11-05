// Define the middleware function with an additional argument
const authenticateUser = (roles) => {
  return (req, res, next) => {
    if (!req.session.verified) {
      return res.status(401).send("User is not verified");
    } else {
      if (!roles.includes(req.session.role)) {
        return res.status(403).send("Forbidden. User is not authorized to access this resource");
      }
    }
    next();
  };
};
module.exports = authenticateUser;
