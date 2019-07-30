var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/cool/:id", function(req, res, next) {
	console.log(req.params);
	res.render('cool', {id: req.params.id});
})

module.exports = router;
