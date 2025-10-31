const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('All fields are required!');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    alert('Message sent successfully!');
    form.reset(); 
});

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const li = document.createElement('li');
    li.textContent = taskText;
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function() {
        taskList.removeChild(li);
    });
    
    li.appendChild(removeBtn);
    taskList.appendChild(li);
    
    taskInput.value = '';
});