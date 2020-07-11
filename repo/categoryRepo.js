'user-strict'
const Cate = require('../models').Category;

const postCate = (req, res, next) => {
  var normalizedDate = new Date(Date.now()).toISOString();
  const body = {name: req.sanitize(req.param('name')), 
                description: req.sanitize(req.param('desc')), 
                date: normalizedDate};
    Cate.build(body)
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

const editCate = (req, res, next) => {
  let catId = req.sanitize(req.param('catId'))
  let name = req.sanitize(req.param('name'))
  let desc = req.sanitize(req.param('desc'))
  Cate.update(
    { name: name, description: desc },
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

const delCate = (req, res, next) => {
  let catId = req.sanitize(req.param('catId'))
  Cate.destroy(
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

const getCate = (req, res, next) => {
  Cate.findAll().then(function (cates) {
      res.send(cates);
  }).catch(function(err) {
      res.send("failed");
  });
}

const userRepository = {
    postCate,
    getCate,
    editCate,
    delCate,
}

module.exports = userRepository;


