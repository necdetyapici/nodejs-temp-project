const AppError = require("./AppError");

class NotFoundError extends AppError {
  constructor(message = "Kaynak bulunamadı") {
    super(message, 404);
  }
}

module.exports = NotFoundError;
