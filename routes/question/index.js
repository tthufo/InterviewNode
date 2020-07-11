const repo = require('../../repo/questionRepo');
var express = require('express');
var router = express.Router();

router.get('/getQuestion', function(req, res, next) {
  repo.getQuestion(req, res, next);
});

router.post('/getQuestionId', function(req, res, next) {
  repo.getQuestionId(req, res, next);
});

router.post('/postQuestion', function(req, res, next) {
  repo.postQuestion(req, res, next);
});

router.post('/editQuestion', function(req, res, next) {
  repo.editQuestion(req, res, next);
});

router.post('/delQuestion', function(req, res, next) {
  repo.delQuestion(req, res, next);
});

module.exports = router;
