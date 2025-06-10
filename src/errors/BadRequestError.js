const AppError = require("./AppError");

class BadRequestError extends AppError {
  constructor(message = "Geçersiz istek") {
    super(message, 400);
  }
}

module.exports = BadRequestError;
