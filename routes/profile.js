module.exports = function(app, mongoose) {
let User = require('../models/User');

app.get('/profile/:username', function(req, res, next) {
	User.findOne({username: req.params.username}).
	populate('blogs').
	exec( (err, user) => {
		console.log(user);
		if(err) return err;
		if(req.user && req.user.username === req.params.username) {
			res.render('profile_self', { user: user });
		} else if(!req.user || req.user.username !== req.params.username) {
			res.render('profile_other', { user: user })
		}
	})
})
}
