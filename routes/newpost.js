module.exports = (app, mongoose) => {
	let Post = require('../models/Post');

	app.get('/', isLoggedIn, function(req, res, next) {
		res.render('newpost');
	})

	app.post('/', function(req, res, next) {
		console.log(req.user);
		let newPost = new Post();
		newPost.title = req.body.post_title;
		newPost.author = req.user.username;
		newPost.body = req.body.post_body.split(/[\r\n]+/);
		newPost.save();
		res.redirect('/profile');
	})

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
	    	return next();
	    res.redirect('/');
	}	
}