const convertGetToPost = (req, res, next) => {
    if (req.method === "GET") {
      req.method = "POST";
    }
    next();
  };
module.exports = convertGetToPost;  