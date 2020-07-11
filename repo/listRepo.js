'user-strict'
const List = require('../models').List;
const Answer = require('../models').Answer;
const Category = require('../models').Category;
const Question = require('../models').Question;
const Sequelize = require('sequelize');

const postList = (req, res, next) => {
  var normalizedDate = new Date(Date.now()).toISOString();
  const body = {
    name: req.sanitize(req.param('name')),
    description: req.sanitize(req.param('desc')),
    config: req.sanitize(req.param('config')),
    date: normalizedDate
  };
  List.build(body)
    .save()
    .then(() => {
      console.log('the data saved!');
      res.send("Data saved");
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
      res.send("error" + error);
    })
}

const getListId = (req, res, next) => {
  let qId = req.sanitize(req.param('id'))
  List.findAll(
    { where: { id: qId } }
  )
    .then((r) => {
      res.send(r);
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
      res.send('error');
    })
}

const getListById = (req, res, next) => {
  let qId = req.sanitize(req.param('id'))
  List.findOne(
    { where: { id: qId } }
  )
    .then((r) => {
      const option = JSON.parse(r.config)
      const questions = option.filter(con => con.checked && con.checked === 1);
      const catId = questions.map(q => {
        return q.categoryId;
      })
      var temp = 0
      questions.map(q => {
        temp += q.questions
      })

      Answer.findAll({
        where: {
          catId: catId
        }, limit: temp, order: [
          [Sequelize.literal('RAND()')]]
      }).then((answers) => {
        const result = []
        Promise.all(answers.map((ans, index) => {
          const data = {};
          data.question = ans.subject;
          data.answer = ans.resultId === 0 ? 'a' : ans.resultId === 1 ? 'b' : ans.resultId === 2 ? 'c' : 'd';
          data.category = ans.category;
          Question.findAll({ where: { questionId: ans.questionId } }).then(function (list) {
            const questions = [];
            list.map((q, index) => {
              questions.push(q.question)
              data[index === 0 ? 'a' : index === 1 ? 'b' : index === 2 ? 'c' : 'd'] = q.question;
            })
            data.questions = questions;
            result.push(data)
            if (result.length === answers.length) {
              res.send(result);
            }
          }).catch(function (err) {
            console.log('error', err);
            res.send('error');
          });
        })).then(function () {
        });
      })
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
      res.send('error');
    })
}

const editList = (req, res, next) => {
  let catId = req.sanitize(req.param('id'))
  let name = req.sanitize(req.param('name'))
  let desc = req.sanitize(req.param('desc'))
  let config = req.sanitize(req.param('config'))
  List.update(
    { name: name, description: desc, config: config },
    { where: { id: catId } }
  )
    .then(() => {
      console.log('the data saved!');
      res.send("Data saved");
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
      res.send("error" + error);
    })
}

const delList = (req, res, next) => {
  let catId = req.sanitize(req.param('id'))
  List.destroy(
    { where: { id: catId } }
  )
    .then(() => {
      console.log('the data saved!');
      res.send("Data saved");
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
      res.send("error" + error);
    })
}

const getListConfig = (req, res, next) => {
  var configData = [];
  Category.findAll().then(function (list) {
    Promise.all(list.map(cate =>
      Answer.findAll(
        { where: { catId: cate.id } }
      )
        .then((r) => {
          configData.push({ category: cate.name, categoryId: cate.id, total: r.length })
        })
        .catch(error => {
          console.log('uh oh something wasn right!');
        })
    )).then(function () {
      res.send(configData);
    });

  }).catch(function (err) {
    res.send("failed");
  });
}

const getListConfigId = (req, res, next) => {
  let qId = req.sanitize(req.param('id'))
  List.findOne(
    { where: { id: qId } }
  )
    .then((r) => {
      const config = r.config;
      console.log('->', config);
      res.send({ config: config });
    })
    .catch(error => {
      console.log('uh oh something wasn right!');
      console.log(error);
      res.send('error');
    })
}

const getList = (req, res, next) => {
  List.findAll().then(function (list) {
    res.send(list);
  }).catch(function (err) {
    res.send("failed");
  });
}

const userRepository = {
  postList,
  getList,
  editList,
  delList,
  getListId,
  getListConfig,
  getListById,
  getListConfigId,
}

module.exports = userRepository;


