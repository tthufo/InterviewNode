const repo = require('../../repo/answerRepo');
var express = require('express');
var router = express.Router();

router.get('/getAnswer', function(req, res, next) {
  repo.getAnswer(req, res, next);
});

router.post('/getAnswerId', function(req, res, next) {
  repo.getAnswerId(req, res, next);
});

module.exports = router;
