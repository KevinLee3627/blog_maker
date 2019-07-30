let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BlogSchema = new Schema({
	name: String,
	desc: String,
	owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
}, {
	collection: 'blogs',
})

module.exports = mongoose.model('Blog', BlogSchema);
