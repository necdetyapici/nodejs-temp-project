const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.empty": "İsim boş olamaz",
    "string.min": "İsim en az 2 karakter olmalı",
    "any.required": "İsim zorunludur",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "E-posta boş olamaz",
    "string.email": "Geçerli bir e-posta girin",
    "any.required": "E-posta zorunludur",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Şifre boş olamaz",
    "string.min": "Şifre en az 6 karakter olmalı",
    "any.required": "Şifre zorunludur",
  }),
  role: Joi.string().valid("user", "admin").optional().messages({
    "any.only": 'Rol yalnızca "user" veya "admin" olabilir',
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
})
  .min(1)
  .messages({
    "object.min": "En az bir alan girilmelidir",
  });

module.exports = {
  createUserSchema,
  updateUserSchema,
};
