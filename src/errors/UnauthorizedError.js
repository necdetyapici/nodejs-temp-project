const AppError = require("./AppError");

class UnauthorizedError extends AppError {
  constructor(message = "Yetkisiz erişim") {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
