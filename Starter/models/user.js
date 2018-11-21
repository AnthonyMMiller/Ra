module.exports = function(sequelize, DataTypes) {
  var UserFeeling = sequelize.define("UserFeeling", {
    feeling: DataTypes.STRING,
    // userID: DataType.INTEGER
  });
  return UserFeeling;
};
