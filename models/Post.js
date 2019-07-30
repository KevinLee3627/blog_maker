let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema({
	title: String,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	body: Array,
	date: {type: Date, default: Date.now},
}, {
	collection: "posts",
})

module.exports = mongoose.model('Post', PostSchema);