const BaseRepository = require("../../core/BaseRepository");
const User = require("./user.model");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.model.findOne({ where: { email } });
  }
}

module.exports = new UserRepository();
