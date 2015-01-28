var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/usage/policy', function(req, res){
  res.render('pages/policy');
})

module.exports = router;
