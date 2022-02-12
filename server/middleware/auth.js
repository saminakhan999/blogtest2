const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      throw new Error("Missing token");
    }
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.SECRET, async (err, data) => {
      console.log(data);
      if (err) {
        res.status(403).json({ err: "Invalid token" });
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(403).json({ err: "Missing token" });
  }
}

module.exports = {
  verifyToken,
};
