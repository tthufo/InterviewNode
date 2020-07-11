'user-strict'
// const Question = require('../models').Question;
const Answer = require('../models').Answer;
// const uuidv1 = require('uuid/v1');

// const postQuestion = (req, res, next) =>  {
//   var normalizedDate = new Date(Date.now()).toISOString();
//   let result = JSON.parse(req.param('question'))
//   let questions = result['questions']
//   let subject = result["subject"]
//   let category = result["category"]
//   let resultId = result["answerId"]
//   let cateId = result["categoryId"]
//   let questionId = uuidv1()
//   let answer = questions[resultId]["question"]
//   const ans = {questionId: questionId, 
//               catId: cateId, 
//               resultId: resultId,
//               answer: answer,
//               subject: subject,
//               category: category,
//             };
//   Answer.build(ans)
//   .save()
//   .then(() => {
//     console.log('the data saved!');
//   })
//   .catch(error => {
//     console.log('uh oh something wasn right!');
//     console.log(error);
//   })
//   var questionList = [];
//   for(var i = 0; i < questions.length; i++){
//     const body = {questionId: questionId,
//                   question: questions[i]["question"], 
//                   catId: cateId, 
//                   resultId: resultId,
//                   date: normalizedDate,
//                   subject: subject,
//                 };
//     questionList.push(body)
//   }
//   Question.bulkCreate(questionList)
//   res.send(JSON.parse(req.param('question')));
// }

// const editQuestion = (req, res, next) => {
//   let catId = req.sanitize(req.param('catId'))
//   let name = req.sanitize(req.param('name'))
//   let desc = req.sanitize(req.param('desc'))
//   Question.update(
//     { name: name, description: desc },
//     { where: { id: catId } }
//   )
//   .then(() => {
//     console.log('the data saved!');
//     res.send("Data saved");
//   })
//   .catch(error => {
//     console.log('uh oh something wasn right!');
//     console.log(error);
//     res.send("error" + error);
//   })
// }

// const delQuestion = (req, res, next) => {
//   let qId = req.sanitize(req.param('questionId'))
//   Question.destroy(
//     { where: { questionId: qId } }
//   )
//   .then(() => {
//     console.log('the data saved!');
//   })
//   .catch(error => {
//     console.log('uh oh something wasn right!');
//     console.log(error);
//   })
//   Answer.destroy(
//     { where: { questionId: qId } }
//   )
//   .then(() => {
//     console.log('the data saved!');
//   })
//   .catch(error => {
//     console.log('uh oh something wasn right!');
//     console.log(error);
//   })
//   res.send("save");
// }

const getAnswerId = (req, res, next) => {
  let catId = req.sanitize(req.param('catId'))
  Answer.findAll(
    { where: { catId: catId } }
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

const getAnswer = (req, res, next) => {
  Answer.findAll().then(function (answer) {
      res.send(answer);
  }).catch(function(err) {
      res.send("failed");
  });
}

const userRepository = {
    getAnswer,
    getAnswerId,
}

module.exports = userRepository;


