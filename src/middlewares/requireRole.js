const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return next(new UnauthorizedError("Bu işlem için yetkiniz yok"));
    }
    next();
  };
};
