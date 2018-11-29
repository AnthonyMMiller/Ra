module.exports = function (sequelize, DataTypes) {
  var UserFeeling = sequelize.define("UserFeeling", {
    feeling: DataTypes.STRING,
    nasa: DataTypes.STRING(1235),
  });
  return UserFeeling;
};