const express = require('express');
const router = express.Router();
const lib = require('../lib/todos');

router.route('/')
	.get(lib.getTodos)
	.post(lib.createTodos)

router.route('/:todoId')
	.get(lib.getTodo)
	.patch(lib.updateTodo)
	.delete(lib.deleteTodo)

module.exports = router;