let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Post = require('../models/Post');

router.get('/', [isLoggedIn, test], function(req, res, next) {
	Post.find({}).sort({date: "descending"}).exec( (err, posts) => {
		if(err) console.log(error);
		res.render('feed', {posts: posts})
	})
})

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
    	return next();
    res.redirect('/');

}

function test(req, res, next) {
	console.log("test!");
	return next();
}

module.exports = router;