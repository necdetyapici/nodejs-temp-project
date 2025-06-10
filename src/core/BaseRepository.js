// src/core/BaseRepository.js
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  create(data, options = {}) {
    return this.model.create(data, options);
  }

  findAll(options = {}) {
    return this.model.findAll(options);
  }

  findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  async update(id, data, options = {}) {
    const item = await this.model.findByPk(id, options);
    if (!item) return null;
    return item.update(data, options);
  }

  async delete(id, options = {}) {
    const item = await this.model.findByPk(id);
    if (!item) return null;

    // 1️⃣ Manuel olarak deletedBy alanını ayarlayıp kaydediyoruz
    if (options.userId) {
      item.deletedBy = options.userId;
      await item.save({ hooks: false }); // bu save silme değil, sadece update yapar
    }

    // 2️⃣ Ardından soft-delete’i tetikliyoruz
    await item.destroy(); // paranoid: true -> sadece deletedDate günceller

    return item;
  }
  // soft-deleted dahil tüm kayıtları getir
  findAllWithDeleted(options = {}) {
    return this.model.findAll({ paranoid: false, ...options });
  }

  // restore et
  async restore(id, options = {}) {
    const item = await this.model.findByPk(id, { paranoid: false });
    if (!item) return null;
    await item.restore(options);
    return item;
  }
}

module.exports = BaseRepository;
