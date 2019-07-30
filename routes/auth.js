module.exports = function(app, passport) {
	//LOGIN
	app.get('/login', function(req, res, next) {
		res.render('login', {test: "hello, testing"});
	});

	app.post('/login', 
		passport.authenticate('local-login', {
			failureRedirect: '/login',
		}), (req, res, next) => {
			res.redirect(`/profile/${req.user.username}`);
		});

	//LOGOUT
	app.get('/logout', function(req, res, next) {
		req.logout();
		res.redirect('/');
	});

	//SIGNUP
	app.get('/signup', function(req, res, next) {
		res.render('signup');
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
	}));
}