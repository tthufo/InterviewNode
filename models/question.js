'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id:{
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true
    },
    subject: DataTypes.STRING,
    questionId: DataTypes.STRING,
    question: DataTypes.STRING,
    catId: DataTypes.BIGINT(20),
    resultId: DataTypes.BIGINT(20),
    date: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};