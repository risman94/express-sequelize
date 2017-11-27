"use strict";
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define("Task", {
    title: DataTypes.STRING
  });
  Task.associate = models => {
    Task.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Task;
};
