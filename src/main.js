var todoInput = document.getElementById('item');
var addButton = document.getElementById('add');
var todoList = document.getElementById('todo');
var completedList = document.getElementById('completed');

var todos = (localStorage.getItem('listTodos')? localStorage.getItem('listTodos').split(','): []);
var completed = (localStorage.getItem('listCompleted')? localStorage.getItem('listCompleted').split(','): []);
localStorage.clear('ltodos');
localStorage.clear('lcompleted');

renderTodoList();

addButton.addEventListener('click', function () {
  var todoText = todoInput.value;
  if (todoText.trim() !== '') {
    addTodoToList(todoText);
    todoInput.value = '';
  }
});

// Menambahkan event listener untuk input field
todoInput.addEventListener('keydown', function (e) {
  var todoText = todoInput.value;
  if (e.code === 'Enter' && todoText.trim() !== '') {
    addTodoToList(todoText);
    todoInput.value = '';
  }
});

// Fungsi untuk menambahkan to-do ke daftar
function addTodoToList(todoText) {
  todos.unshift(todoText);
  renderTodoList();
}

// Fungsi untuk menghapus to-do dari daftar
function removeTodoFromList(index) {
  todos.splice(index, 1);
  renderTodoList();
}

function removeUndoFromList(index) {
  completed.splice(index, 1);
  renderTodoList();
}

// Fungsi untuk menandai to-do sebagai selesai atau belum selesai
function toggleTodoCompletion(index) {
  completed.push(todos[index]);
  todos.splice(index, 1);
  renderTodoList();
}

function unTodo(index) {
  todos.unshift(completed[index]);
  completed.splice(index, 1);
  renderTodoList();
}

// Fungsi untuk menghasilkan tampilan daftar to-do
function renderTodoList() {
  localStorage.setItem('listTodos', todos);
  localStorage.setItem('listCompleted', completed);
  todoList.innerHTML = '';

  if (todos.length === 0) {
    todoList.innerHTML =
      '<p class="text-center text-sm text-purple-500 font-[500] mb-3">Nothing to do!</p>';
  }

  todos.forEach(function (todoItem, index) {
    var todoItemElement = document.createElement('li');
    todoItemElement.classList.add(
      'bg-purple-100',
      'font-[450]',
      'w-full',
      'flex',
      'justify-between',
      'pl-4',
      'border-b-4',
      'border-purple-200',
      'hover:bg-purple-300',
      'rounded-md',
      'transition',
      'duration-250',
      'hover:py-1',
    );

    var buttons = document.createElement('div');
    buttons.classList.add('flex', 'space-x-4', 'scale-75');

    var todoCompleteButton = document.createElement('button');
    todoCompleteButton.textContent = 'Done';
    todoCompleteButton.addEventListener('click', function () {
      toggleTodoCompletion(index);
    });

    todoCompleteButton.classList.add(
      'bg-purple-500',
      'text-white',
      'px-4',
      'py-2',
      'rounded-md',
      'hover:bg-purple-600',
      'transition',
      'duration-150'
    );

    var todoText = document.createElement('div');
    todoText.textContent = todoItem;
    todoText.classList.add('font-[450]', 'py-1');

    var todoRemoveButton = document.createElement('button');
    todoRemoveButton.textContent = 'Remove';
    todoRemoveButton.addEventListener('click', function () {
      removeTodoFromList(index);
    });
    todoRemoveButton.classList.add(
      'bg-purple-500',
      'text-white',
      'px-4',
      'py-2',
      'rounded-md',
      'hover:bg-purple-600',
      'transition',
      'duration-150'
    );

    buttons.appendChild(todoCompleteButton);
    buttons.appendChild(todoRemoveButton);
    todoItemElement.appendChild(todoText);
    todoItemElement.appendChild(buttons);

    todoList.appendChild(todoItemElement);
  });

  completedList.innerHTML = '';

  if (completed.length === 0) {
    completedList.innerHTML =
      '<p class="text-center text-sm text-purple-500 font-[500] mb-3">Nothing completed</p>';
  }

  completed.forEach((todoItem, index) => {
    var todoItemElement = document.createElement('li');
    todoItemElement.classList.add(
      'bg-purple-100',
      'font-[450]',
      'w-full',
      'flex',
      'justify-between',
      'pl-4',
      'border-b-4',
      'border-purple-200',
      'hover:bg-purple-300',
      'rounded-md',
      'transition',
      'duration-250',
      'hover:py-1' 
    );
    var buttons = document.createElement('div');
    buttons.classList.add('flex', 'space-x-4' ,'scale-75');

    var todoCompleteButton = document.createElement('button');
    todoCompleteButton.textContent = 'Undone';
    todoCompleteButton.addEventListener('click', function () {
      unTodo(index);
    });

    todoCompleteButton.classList.add(
      'bg-purple-500',
      'text-white',
      'px-4',
      'py-2',
      'rounded-md',
      'hover:bg-purple-600',
      'transition',
      'duration-150'
    );

    var todoText = document.createElement('div');
    todoText.textContent = todoItem;
    todoText.classList.add('font-[450]', 'py-1');

    var todoRemoveButton = document.createElement('button');
    todoRemoveButton.textContent = 'Remove';
    todoRemoveButton.addEventListener('click', function () {
      removeUndoFromList(index);
    });
    todoRemoveButton.classList.add(
      'bg-purple-500',
      'text-white',
      'px-4',
      'py-2',
      'rounded-md',
      'hover:bg-purple-600',
      'transition',
      'duration-150'
    );

    buttons.appendChild(todoCompleteButton);
    buttons.appendChild(todoRemoveButton);
    todoItemElement.appendChild(todoText);
    todoItemElement.appendChild(buttons);

    completedList.appendChild(todoItemElement);
  });
}
