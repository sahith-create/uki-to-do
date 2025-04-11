// Load tasks from LocalStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const prioritySelect = document.getElementById('prioritySelect');
  const taskList = document.getElementById('taskList');

  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  // Create task object
  const task = {
    text: taskText,
    priority: priority
  };

  // Add task to UI
  createTaskElement(task);

  // Save task to LocalStorage
  saveTaskToLocalStorage(task);

  taskInput.value = '';
}

// Create and display a task element
function createTaskElement(task) {
  const taskList = document.getElementById('taskList');

  const li = document.createElement('li');
  li.innerHTML = `
    ${task.text} - Priority: ${task.priority} 
    <button class="delete-btn" onclick="removeTask(this)">Delete</button>`;

  // Set color based on priority
  if (task.priority === 'High') {
    li.style.color = 'red';
  } else if (task.priority === 'Medium') {
    li.style.color = 'orange'; // orange looks better than yellow for text
  } else if (task.priority === 'Low') {
    li.style.color = 'green';
  }

  taskList.appendChild(li);
}

// Save a task into LocalStorage
function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from LocalStorage and display them
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(createTaskElement);
}

// Remove a task from UI and LocalStorage
function removeTask(button) {
  const li = button.parentElement;
  const taskText = li.firstChild.textContent.split(' - Priority: ')[0];
  
  // Remove from UI
  li.remove();

  // Remove from LocalStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
