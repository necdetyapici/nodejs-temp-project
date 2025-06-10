const jwt = require("jsonwebtoken");
require("dotenv").config();

const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Geçersiz Token"));
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.userId,
      role: payload.role,
    };

    return next();
  } catch (err) {
    return next(new UnauthorizedError("Token doğrulanamadı"));
  }
};
