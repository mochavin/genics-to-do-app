// Mendapatkan referensi ke elemen HTML
var todoInput = document.getElementById('item');
var addButton = document.getElementById('add');
var todoList = document.getElementById('todo');

// Mendefinisikan array untuk menyimpan daftar to-do
var todos = [];

// Menambahkan event listener untuk tombol "Add"
addButton.addEventListener('click', function() {
  var todoText = todoInput.value;
  if (todoText.trim() !== '') {
    addTodoToList(todoText);
    todoInput.value = '';
  }
});

// Menambahkan event listener untuk input field
todoInput.addEventListener('keydown', function(e) {
  var todoText = todoInput.value;
  if (e.code === 'Enter' && todoText.trim() !== '') {
    addTodoToList(todoText);
    todoInput.value = '';
  }
});

// Fungsi untuk menambahkan to-do ke daftar
function addTodoToList(todoText) {
  var todoItem = {
    text: todoText,
    completed: false
  };
  todos.push(todoItem);
  renderTodoList();
}

// Fungsi untuk menghapus to-do dari daftar
function removeTodoFromList(index) {
  todos.splice(index, 1);
  renderTodoList();
}

// Fungsi untuk menandai to-do sebagai selesai atau belum selesai
function toggleTodoCompletion(index) {
  todos[index].completed = !todos[index].completed;
  renderTodoList();
}

// Fungsi untuk menghasilkan tampilan daftar to-do
function renderTodoList() {
  todoList.innerHTML = '';

  todos.forEach(function(todoItem, index) {
    var todoItemElement = document.createElement('li');
    todoItemElement.classList.add("bg-purple-100", "font-[450]",  "w-full", "flex", "justify-between", "px-4", "py-4", "border-b-8", "border-purple-200", "hover:bg-purple-300", "rounded-md", "transition", "duration-150", "hover:p-5");

    var buttons = document.createElement('div');
    buttons.classList.add("flex", "space-x-4");

    var todoCompleteButton = document.createElement('button');
    todoCompleteButton.textContent = 'Complete';
    todoCompleteButton.addEventListener('click', function() {
      toggleTodoCompletion(index);
    });

    todoCompleteButton.classList.add("bg-purple-500", "text-white", "px-4", "py-2", "rounded-md", "hover:bg-purple-600", "transition", "duration-150");

    var todoText = document.createElement('div');
    todoText.textContent = todoItem.text;
    if (todoItem.completed) {
      todoText.style.textDecoration = 'line-through';
    }
    todoText.classList.add("font-[450]", "text-lg");

    var todoRemoveButton = document.createElement('button');
    todoRemoveButton.textContent = 'Remove';
    todoRemoveButton.addEventListener('click', function() {
      removeTodoFromList(index);
    });
    todoRemoveButton.classList.add("bg-purple-500", "text-white", "px-4", "py-2", "rounded-md", "hover:bg-purple-600", "transition", "duration-150");

    buttons.appendChild(todoCompleteButton);
    buttons.appendChild(todoRemoveButton);
    todoItemElement.appendChild(todoText);
    todoItemElement.appendChild(buttons);
    

    todoList.appendChild(todoItemElement);
  });
}
