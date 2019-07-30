module.exports = function(app, mongoose) {
	let User = require('../models/User');
	app.get('/profile/:username', function(req, res, next) {

		User.findOne({_id: req.user._id}).
		populate('blogs').
		exec( (err, user) => {
			if(err) return err;
			if(req.user.username === req.params.username) {
				res.render('profile_self', {
					user: user,
				});	
			}
			else {
				res.render('profile_other', {username: req.params.username})
			}			

		}) 

		
	})



}