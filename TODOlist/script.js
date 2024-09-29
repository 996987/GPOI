const addButton = document.querySelector('.add-todo button');
const inputField = document.querySelector('.add-todo input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.getElementById('message');

const clearButton = document.createElement('button');
clearButton.textContent = 'Cancella Tutto';
clearButton.style.marginTop = '16px';
document.querySelector('main').appendChild(clearButton);

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

  todoCheck.addEventListener('mouseenter', () => {
    todoCheck.innerHTML = '<img src="images/75519.png" alt="Check Icon">'; // Cambia immagine al passaggio del mouse
  });

  // Ripristina l'immagine quando il mouse esce
  todoCheck.addEventListener('mouseleave', () => {
    todoCheck.innerHTML = '<img src="images/check.svg" alt="Check Icon">';
  });

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

clearButton.onclick = () => {
  if (confirm('Sei sicuro di voler cancellare tutti gli elementi?')) {
    todoList.innerHTML = ''; // Cancella la lista
    updateEmptyListMessage();
  }
};

// Eventi per il pulsante e il tasto Enter
addButton.addEventListener('click', addTodo);
inputField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

updateEmptyListMessage();
