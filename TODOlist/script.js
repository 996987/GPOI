const addButton = document.querySelector('.add-todo button');
const inputField = document.querySelector('.add-todo input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.getElementById('message');
const clearButton = document.getElementById('clearButton');


// Array per gestire le attività
let activities = [];

// Funzione per aggiungere un'attività
function addTodo() {
  const todoText = inputField.value.trim();

  if (todoText !== '') {
    activities.push(todoText); 
    inputField.value = '';
    showActivities();
  }
}

// Funzione per visualizzare le attività
function showActivities() {
  todoList.innerHTML = ''; // Pulisci la lista esistente
  activities.forEach((activity, index) => {
    const todoItem = createTodoItem(activity, index);
    todoList.appendChild(todoItem);
  });
  updateEmptyListMessage(); // Aggiorna il messaggio per la lista vuota
}

// Funzione per creare un elemento della lista
function createTodoItem(text, index) {
  const todoItem = document.createElement('li');
  todoItem.classList.add('todo-item');

  const todoCheck = document.createElement('div');
  todoCheck.classList.add('todo-check');
  todoCheck.innerHTML = '<img src="images/check.svg" alt="Check Icon">';

  // Cambia immagine al passaggio del mouse
  todoCheck.addEventListener('mouseenter', () => {
    todoCheck.innerHTML = '<img src="images/75519.png" alt="Check Icon">';
  });

  // Ripristina l'immagine quando il mouse esce
  todoCheck.addEventListener('mouseleave', () => {
    todoCheck.innerHTML = '<img src="images/check.svg" alt="Check Icon">';
  });

  const todoText = document.createElement('p');
  todoText.classList.add('todo-text');
  todoText.classList.add('sopra');
  todoText.textContent = text;

  // Aggiungi la possibilità di modificare l'attività
  todoText.onclick = () => {
    const newText = prompt('Modifica l\'attività:', text);
    if (newText !== null && newText.trim() !== '') {
      activities[index] = newText.trim(); // Aggiorna l'attività nell'array
      showActivities(); // Mostra le attività aggiornate
    }
  };

  // Rimuovi l'attività al click sull'icona
  todoCheck.onclick = () => {
    activities.splice(index, 1); 
    showActivities(); 
    
  };

  todoItem.appendChild(todoCheck);
  todoItem.appendChild(todoText);

  return todoItem;
}

function updateEmptyListMessage() {
  if (todoList.children.length === 0) {
    emptyListMessage.classList.remove('hidden');
  } else {
    emptyListMessage.classList.add('hidden');
  }
}

// Pulsante per cancellare tutte le attività
clearButton.onclick = () => {
  if (confirm('Sei sicuro di voler cancellare tutti gli elementi?')) {
    activities = []; 
    showActivities();
  }
};

// Eventi per il pulsante e il tasto Enter
addButton.addEventListener('click', addTodo);
inputField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// Mostra il messaggio per la lista vuota all'avvio
updateEmptyListMessage();
