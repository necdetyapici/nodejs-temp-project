// src/modules/user/user.service.js
const BaseService = require("../../core/BaseService");
const userRepo = require("./user.repository");
const bcrypt = require("bcrypt");
const BadRequest = require("../../errors/BadRequestError");

class UserService extends BaseService {
  constructor() {
    super(userRepo);
  }

  async create(data, userId) {
    if (!data.password) throw new BadRequest("Şifre zorunludur");
    const hash = await bcrypt.hash(data.password, 10);
    return this.repository.create(
      {
        name: data.name,
        email: data.email,
        password: hash,
        role: data.role || "user",
      },
      { userId }
    );
  }

  // BaseService.update(id,data,options) zaten options kabul ediyor
  update(id, data, userId) {
    return super.update(id, data, { userId });
  }

  delete(id, userId) {
    return super.delete(id, { userId });
  }

  // soft-delete dahil tüm kullanıcılar
  findAllWithDeleted() {
    return this.repository.findAllWithDeleted();
  }

  // restore et
  restore(id, userId) {
    return this.repository.restore(id, { userId });
  }
}

module.exports = new UserService();
