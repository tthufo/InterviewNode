'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true
    },
    subject: DataTypes.STRING,
    category: DataTypes.STRING,
    resultId: DataTypes.BIGINT(20),
    questionId: DataTypes.STRING,
    catId: DataTypes.BIGINT(20),
    answer: DataTypes.STRING
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
  };
  return Answer;
};