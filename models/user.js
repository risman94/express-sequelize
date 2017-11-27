"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    username: DataTypes.STRING
  });
  User.associate = models => {
    User.hasMany(models.Task, {
      foreignKey: "userId",
      as: "Tasks"
    });
  };
  return User;
};
