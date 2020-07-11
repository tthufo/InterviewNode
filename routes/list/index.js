const repo = require('../../repo/listRepo');
var express = require('express');
var router = express.Router();

router.get('/getList', function (req, res, next) {
  repo.getList(req, res, next);
});

router.get('/getListConfig', function (req, res, next) {
  repo.getListConfig(req, res, next);
});

router.post('/getListId', function (req, res, next) {
  repo.getListId(req, res, next);
});

router.post('/getListById', function (req, res, next) {
  repo.getListById(req, res, next);
});

router.post('/getListConfigId', function (req, res, next) {
  repo.getListConfigId(req, res, next);
});

router.post('/postList', function (req, res, next) {
  repo.postList(req, res, next);
});

router.post('/editList', function (req, res, next) {
  repo.editList(req, res, next);
});

router.post('/delList', function (req, res, next) {
  repo.delList(req, res, next);
});

module.exports = router;
