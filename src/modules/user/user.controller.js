// src/modules/user/user.controller.js
const BaseController = require("../../core/BaseController");
const NotFoundError = require("../../errors/NotFoundError");

class UserController extends BaseController {
  constructor(service) {
    super(service);

    // bind metotlar
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.softList = this.softList.bind(this);
    this.restore = this.restore.bind(this);
  }

  // CREATE → override BaseController
  async create(req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("Yetkilendirme bilgisi eksik");

      const result = await this.service.create(req.body, userId);
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  }

  // UPDATE → override BaseController
  async update(req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("Yetkilendirme bilgisi eksik");

      const updated = await this.service.update(
        req.params.id,
        req.body,
        userId
      );

      if (!updated) throw new NotFoundError("Kullanıcı bulunamadı");
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  }

  // DELETE → override BaseController
  async delete(req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("Yetkilendirme bilgisi eksik");

      const result = await this.service.delete(req.params.id, userId);
      if (!result) throw new NotFoundError("Kullanıcı bulunamadı");
      return res.json({ message: "Kullanıcı silindi" });
    } catch (err) {
      return next(err);
    }
  }

  // soft-deleted listeleme
  async softList(req, res, next) {
    try {
      const data = await this.service.findAllWithDeleted();
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }

  // restore
  async restore(req, res, next) {
    try {
      const userId = req.user?.id;
      const item = await this.service.restore(req.params.id, userId);
      if (!item) throw new NotFoundError("Kullanıcı bulunamadı");
      return res.json(item);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = UserController;
