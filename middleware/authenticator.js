const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "peter");
    if (decoded) {
      req.body.userID = decoded.id;
      next();
    } else {
      res.status(500).send({ warning: "Please Login First!" });
    }
  } else {
    res.status(500).send({ warning: "Please Login First!" });
  }
};

module.exports = { authenticator };
