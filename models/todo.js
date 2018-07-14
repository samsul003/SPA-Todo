const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema_definition
const todoSchema = new Schema({
	name: {
		type: String,
		required: 'Name field is required!'
	},
	completed: {
		type: Boolean,
		default: false
	},
	created_date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Todo = mongoose.model('todo', todoSchema);