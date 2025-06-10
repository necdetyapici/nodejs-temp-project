class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  create(data, options = {}) {
    return this.repository.create(data, options);
  }

  findAll(options = {}) {
    return this.repository.findAll(options);
  }

  findById(id, options = {}) {
    return this.repository.findById(id, options);
  }

  update(id, data, options = {}) {
    return this.repository.update(id, data, options);
  }

  delete(id, options = {}) {
    return this.repository.delete(id, options);
  }
}

module.exports = BaseService;
