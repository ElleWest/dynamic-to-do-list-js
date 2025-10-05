// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Create the addTask Function
    function addTask(taskText, save = true) {
        // If no taskText provided, get it from input
        if (taskText === undefined) {
            taskText = taskInput.value.trim();
        }
        
        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Task Creation and Removal
        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign onclick event to remove button
        removeButton.onclick = function() {
            // Remove the li element from taskList
            taskList.removeChild(li);
            // Remove from Local Storage
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);
        // Append the li to taskList
        taskList.appendChild(li);

        // Clear the task input field
        if (save) {
            taskInput.value = "";
            // Save to Local Storage
            saveTaskToStorage(taskText);
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Attach Event Listeners
    // Add event listener to addButton
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Add event listener to taskInput for 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});