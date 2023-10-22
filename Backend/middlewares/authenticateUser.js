// Define the middleware function with an additional argument
const authenticateUser = (roles) => {
  return (req, res, next) => {
    if (!req.session.verified) {
      return res.status(401).redirect("/");
    } else {
      if (!roles.includes(req.session.role)) {
        return res.status(403).send("Access Forbidden");
      }
    }
    next();
  };
};
module.exports = authenticateUser;
