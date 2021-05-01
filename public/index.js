const endpoint = "/api/todos";
const inputId = $('#todoInput');
const todoList = $('.list');

$(document).ready(function() {
	$.getJSON(endpoint)
		.then(addTodos)
	
	inputId.keypress(event => event.which === 13 ? createTodo() : false);
	
	todoList.on('click', 'li', () => updateTodo($(this)));
	
	todoList.on('click', '.delete', event => {
		event.stopPropagation();
		removeTodo($(this).parent());
	});
});

const addTodos = items => items.forEach(item => addTodo(item));

const addTodo = item => {
	const newTodo =
		$(`<li class="task">${item.name}<span class="delete"></span></li>`);

	newTodo.data('id', item._id);
	newTodo.data('completed', item.completed);

	item.completed ? newTodo.addClass('done') : newTodo;

	todoList.append(newTodo);
}

const createTodo = () => {
	const inputValue = inputId.val();

	if(!inputValue) return;

	$.post(endpoint, { name: inputValue })
		.then(newTodo => {
			inputId.val('');
			addTodo(newTodo);
		})
		.catch(err => console.log(err))
}

const removeTodo = item => {
	const itemClicked = item.data('id');

	$.ajax({
		method: 'DELETE',
		url: `${endpoint}/${itemClicked}`
	})
	.then(() => item.remove());
}

const updateTodo = item => {
	const itemClicked = item.data('id');
	const isCompleted = !item.data('completed');

	$.ajax({
		method: 'PATCH',
		url: `${endpoint}/${itemClicked}`,
		data: { completed: isCompleted }
	})
	.then(() => {
		item.toggleClass('done');
		item.data('completed', isCompleted)
	})
}