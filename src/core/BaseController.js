class BaseController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res, next) {
    try {
      const result = await this.service.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const result = await this.service.findAll();
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const result = await this.service.findById(req.params.id);
      if (!result) return res.status(404).json({ error: "Bulunamadı" });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const result = await this.service.update(req.params.id, req.body);
      if (!result) return res.status(404).json({ error: "Bulunamadı" });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await this.service.delete(req.params.id);
      if (!result) return res.status(404).json({ error: "Bulunamadı" });
      res.json({ message: "Silindi" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BaseController;
