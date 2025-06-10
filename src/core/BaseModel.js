// src/core/BaseModel.js
const { DataTypes } = require("sequelize");

function defineBaseModel(sequelize, modelName, attributes) {
  const model = sequelize.define(
    modelName,
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      ...attributes,
      createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      modifiedDate: { type: DataTypes.DATE, allowNull: true },
      createdBy: { type: DataTypes.INTEGER, allowNull: true },
      modifiedBy: { type: DataTypes.INTEGER, allowNull: true },
      deletedBy: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: false,
      paranoid: true, // deletedAt aktif
      deletedAt: "deletedDate",
    }
  );

  // Hook’larda options.userId’yi oku
  model.addHook("beforeCreate", (instance, options) => {
    if (options.userId) instance.createdBy = options.userId;
  });
  model.addHook("beforeUpdate", (instance, options) => {
    instance.modifiedDate = new Date();
    if (options.userId) instance.modifiedBy = options.userId;
  });

  model.addHook("beforeDestroy", (instance, options) => {
    if (options.userId) instance.deletedBy = options.userId;
  });

  // Restore edildiğinde deletedBy’ı temizle
  model.addHook("afterRestore", (instance, options) => {
    instance.deletedBy = null;
    return instance.save({ userId: options.userId });
  });

  return model;
}

module.exports = defineBaseModel;
