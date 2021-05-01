const db = require('../models');

exports.getTodos = (req, res) => {
	db.Todo.find()
		.then(todos => res.status(200).json(todos))
		.catch(err => res.send(err))
};

exports.createTodos = (req, res) => {
	db.Todo.create(req.body)
		.then(todo => res.status(201).json(todo))
		.catch(err => res.send(err));
};

exports.getTodo = (req, res) => {
	db.Todo.findById(req.params.todoId)
		.then(todo => res.status(200).json(todo))
		.catch(err => res.send(err))
};

exports.updateTodo = (req, res) => {
	db.Todo
		.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
		.then(todo => res.status(200).json(todo))
		.catch(err => res.send(err))
};

exports.deleteTodo = (req, res) => {
	db.Todo.remove({_id: req.params.todoId})
		.then(() => res.status(200).json({message: 'Successfully deleted.'}))
		.catch(err => res.send(err))
};

module.exports = exports;