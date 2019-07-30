let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 10;
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
	username: String,
	password: String,
	blogs: [{type: Schema.Types.ObjectId, ref: 'Blog'}]
}, {
	collection: 'users',
});



module.exports = mongoose.model('User', UserSchema);