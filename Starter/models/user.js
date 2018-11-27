module.exports = function(sequelize, DataTypes) {
  var UserFeeling = sequelize.define("UserFeeling", {
    feeling: DataTypes.STRING,
    nasaData: DataTypes.STRING
  });
  return UserFeeling;
};
