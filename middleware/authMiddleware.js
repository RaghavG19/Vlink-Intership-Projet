const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust path as needed

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      console.log("token___", token);
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?.user?.id);
    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = user; // Attach user to the request
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Bad request" });
  }
};

module.exports = { authMiddleware };
