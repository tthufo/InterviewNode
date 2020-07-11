'user-strict'
const Question = require('../models').Question;
const Answer = require('../models').Answer;
const uuidv1 = require('uuid/v1');
const Sequelize = require('sequelize');

const postQuestion = (req, res, next) => {
  var normalizedDate = new Date(Date.now()).toISOString();
  let result = JSON.parse(req.param('question'))
  let questions = result['questions']
  let subject = result["subject"]
  let category = result["category"]
  let resultId = result["answerId"]
  let cateId = result["categoryId"]
  let questionId = uuidv1()
  let answer = questions[resultId]["question"]
  const ans = {
    questionId: questionId,
    catId: cateId,
    resultId: resultId,
    answer: answer,
    subject: subject,
    category: category,
  };
  Answer.build(ans)
    .save()
    .then(() => {
      console.log('the data saved!');
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
    })
  var questionList = [];
  for (var i = 0; i < questions.length; i++) {
    const body = {
      questionId: questionId,
      question: questions[i]["question"],
      catId: cateId,
      resultId: resultId,
      date: normalizedDate,
      subject: subject,
    };
    questionList.push(body)
  }
  Question.bulkCreate(questionList).then(() => {
    console.log('the data saved!');
    res.send(JSON.parse(req.param('question')));
  })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
    })
}

const editQuestion = (req, res, next) => {
  var normalizedDate = new Date(Date.now()).toISOString();
  let result = JSON.parse(req.param('question'))
  let questions = result['questions']
  let subject = result["subject"]
  let category = result["category"]
  let resultId = result["answerId"]
  let cateId = result["categoryId"]
  let questId = result["questionId"]
  let questionId = questId
  let answer = questions[resultId]["question"]
  const ans = {
    questionId: questionId,
    catId: cateId,
    resultId: resultId,
    answer: answer,
    subject: subject,
    category: category,
  };

  Answer.update(ans,
    { where: { questionId: questionId } })
    .then(() => {
      console.log('the data saved!');
      // res.send(JSON.parse(req.param('question')));
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
    })

  var questionList = [];
  for (var i = 0; i < questions.length; i++) {
    const body = {
      questionId: questionId,
      question: questions[i]["question"],
      catId: cateId,
      resultId: resultId,
      date: normalizedDate,
      subject: subject,
      id: questions[i]["id"]
    };
    questionList.push(body)
  }

  Sequelize.Promise.each(questionList, function (val, index) {
    return Question.update(val, {
      where: {
        id: val.id
      }
    }).then(function (user) {

    }, function (err) {
    });
  })
    .then(function (updateAll) {
      res.json(updateAll);
    }, function (err) {

    });
}

const delQuestion = (req, res, next) => {
  let qId = req.sanitize(req.param('questionId'))
  Question.destroy(
    { where: { questionId: qId } }
  )
    .then(() => {
      console.log('the data saved!');
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
    })
  Answer.destroy(
    { where: { questionId: qId } }
  )
    .then(() => {
      console.log('the data saved!');
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
    })
  res.send("save");
}

const getQuestionId = (req, res, next) => {
  let qId = req.sanitize(req.param('questionId'))
  Question.findAll(
    { where: { questionId: qId } }
  )
    .then((r) => {
      console.log('the data saved!');
      res.send(r);
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
      res.send('error');
    })
}

const getQuestion = (req, res, next) => {
  Question.findAll().then(function (question) {
    res.send(question);
  }).catch(function (err) {
    res.send("failed");
  });
}

const userRepository = {
  postQuestion,
  getQuestion,
  editQuestion,
  delQuestion,
  getQuestionId
}

module.exports = userRepository;


