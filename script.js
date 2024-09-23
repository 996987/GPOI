const addButton = document.querySelector('.add-todo button');
const inputField = document.querySelector('.add-todo input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.getElementById('message');


function addTodo() {
  const todoText = inputField.value;
  
  if (todoText !== '') { 
    const todoItem = createTodoItem(todoText)
    todoList.appendChild(todoItem); 
    inputField.value = '';
    updateEmptyListMessage(); 
  }
}

function createTodoItem(text) {
  const todoItem = document.createElement('li');
  todoItem.classList.add('todo-item');

  const todoCheck = document.createElement('div');
  todoCheck.classList.add('todo-check');
  todoCheck.innerHTML = '<img src="images/check.svg" alt="Check Icon">';

  const todoText = document.createElement('p');
  todoText.classList.add('todo-text');
  todoText.textContent = text;

  todoCheck.onclick = () => {
    todoItem.remove();
    updateEmptyListMessage();
  };

  todoItem.appendChild(todoCheck);
  todoItem.appendChild(todoText);

  return todoItem;
}


function updateEmptyListMessage() {
  if (todoList.children.length === 0) {
    emptyListMessage.classList.remove('hidden');
  }else{
    emptyListMessage.classList.add('hidden');
  }
}

// Eventi per il pulsante e il tasto Enter
addButton.addEventListener('click', addTodo);
inputField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

updateEmptyListMessage();
