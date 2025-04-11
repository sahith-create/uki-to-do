document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="task-text">${taskText}</span>
                <div>
                    <button class="done-button">Done</button>
                    <button class="delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
            taskInput.value = '';

            const doneButton = listItem.querySelector('.done-button');
            const deleteButton = listItem.querySelector('.delete-button');

            doneButton.addEventListener('click', toggleDone);
            deleteButton.addEventListener('click', deleteTask);
        }
    }

    function toggleDone() {
        this.parentNode.parentNode.querySelector('.task-text').classList.toggle('completed');
    }

    function deleteTask() {
        this.parentNode.parentNode.remove();
    }
});