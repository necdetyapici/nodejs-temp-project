const userRepo = require("../user/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../../errors/UnauthorizedError");

const login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new UnauthorizedError("Geçersiz e-posta veya şifre");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new UnauthorizedError("Geçersiz e-posta veya şifre");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { token };
};

module.exports = { login };
