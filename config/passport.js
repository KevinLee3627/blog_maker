let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let User = require('../models/User');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });		

    passport.use('local-signup', new LocalStrategy({
    	username: 'username',
    	password: 'password',	
    	passReqToCallback: true,
    },
    	function(req, username, password, done) {
		process.nextTick(function() {
			User.findOne({username: username}, function(err, user) {
				if(err) return done(err);
				if(user) {
					console.log("user exists already");
					return done(err);
				}
				else {
					let newUser = new User();
					newUser.username = username;
					bcrypt.hash(password, 10, function(err, hash) {
						newUser.password = hash;
						newUser.save(function(err) {
							if(err) throw err;
							return done(null, newUser);
						});
					});
				}
			})
		})
    	}
    ));

    passport.use('local-login', new LocalStrategy({
    	username: 'username',
    	password: 'password',
    	passReqToCallback: true,
    }, 
	    function(req, username, password, done) {
	    	process.nextTick(function() {
		    	User.findOne({username: username}, function(err, user) {
		   			if (err) return done(err);   			
		    		if(!user) {
		    			console.log('no user found');
		    			return done(null, false);
		    		}
		    		bcrypt.compare(password, user.password, function(err, res) {
		    			if(res) return done(null, user);
		    			else return done(null, false);
		    		})


		    	}); //findOne
	    	})//nextTick 
	    } //function (req,use,pw,done)
    )); //passport.use
}