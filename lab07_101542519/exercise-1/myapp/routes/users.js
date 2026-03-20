var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log(`First Name: ${req.body.firstName}`);
  console.log(`Last Name: ${req.body.lastName}`);
  res.send('POST received!');
});

module.exports = router;
