const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const checkAdmin = async (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/admin");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret); // 토큰 해석
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(401).json({ message: "로그인이 필요합니다" });
  }
};

module.exports = checkAdmin;