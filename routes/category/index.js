const repo = require('../../repo/categoryRepo');
var express = require('express');
var router = express.Router();

router.get('/getCategory', function(req, res, next) {
  repo.getCate(req, res, next);
});

router.post('/postCategory', function(req, res, next) {
  repo.postCate(req, res, next);
});

router.post('/editCategory', function(req, res, next) {
  repo.editCate(req, res, next);
});

router.post('/delCategory', function(req, res, next) {
  repo.delCate(req, res, next);
});

module.exports = router;
