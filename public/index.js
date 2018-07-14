const endpoint = "/api/todos";
const inputId = $('#todoInput');
const todoList = $('.list');

$(document).ready(function() {
	$.getJSON(endpoint)
		.then(addTodos)
	
	inputId.keypress((e) => {
		// check if pressed ENTER
		e.which === 13 ? createTodo() : false;
	});
	
	todoList.on('click', 'li', function () {
		updateTodo($(this));
	});
	
	todoList.on('click', '.delete', function(e) {
		// stop event bubbling
		e.stopPropagation();
		removeTodo($(this).parent());
	});
});

function addTodos(todos) {
	todos.forEach((todo) => {
		addTodo(todo)
	});
}

function addTodo(todo) {
	// insert item
	const newTodo =
		$(`<li class="task">${todo.name}<span class="delete"></span></li>`);
	// keep track of the id with completed status for real-time sync
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	
	todo.completed ? newTodo.addClass('done') : newTodo;
	todoList.append(newTodo);
}

function createTodo() {
	const userInput = inputId.val();
	// prevent POST without payload
	if(!userInput) return;
	const payload = { name: userInput };
	
	$.post(endpoint, payload)
		.then((newTodo) => {
			inputId.val('');
			addTodo(newTodo);
		})
		.catch((err) => {
			console.log(err)
		})
}

function removeTodo(todo) {
	const clickedId = todo.data('id');
	
	$.ajax({
		method: 'DELETE',
		url: `${endpoint}/${clickedId}`
	})
	.then(() => {
		todo.remove()
	});
}

function updateTodo(todo) {
	const clickedId = todo.data('id');
	// toggle completed status
	const isCompleted = !todo.data('completed');
	const payload = { completed: isCompleted };
	
	$.ajax({
		method: 'PATCH',
		url: `${endpoint}/${clickedId}`,
		data: payload
	})
	.then(() => {
		todo.toggleClass('done');
		todo.data('completed', isCompleted)
	})
}