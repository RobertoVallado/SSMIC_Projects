//User interface DOM selectors
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

// Load event listeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks); //gett'em
  form.addEventListener('submit', addTask); //add'em
  taskList.addEventListener('click', removeTask); //rmove'em
  clearBtn.addEventListener('click', clearTasks); //clear'em
  filter.addEventListener('keyup', filterTasks); //filtro
}

// local storage get function
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task'); //alert ???
  }
  //else (obviamente)
  const li = document.createElement('li');

  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');

  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = '';

  e.preventDefault();//event listener default behaivour prevention 
}

//Local storage function
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove(); //DOM navigation
      
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Local storage removal
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear'em
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild) { //<------dom traverse with a while loop
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

// Clear local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter 
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}