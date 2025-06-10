const BadRequestError = require("../errors/BadRequestError");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((d) => d.message).join(" | ");
      return next(new BadRequestError(message));
    }

    next();
  };
};

module.exports = validate;
