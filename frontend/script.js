// const apiUrl = 'http://localhost:5000/api/todos';

// async function fetchTodos() {
//   const response = await fetch(apiUrl);
//   const todos = await response.json();
//   const todoList = document.getElementById('todo-list');
//   todoList.innerHTML = '';
//   todos.forEach(todo => {
//     const li = document.createElement('li');
//     li.textContent = todo.task;
//     if (todo.completed) {
//       li.classList.add('completed');
//     }
//     todoList.appendChild(li);
//   });
// }

// async function addTodo() {
//   const taskInput = document.getElementById('task');
//   const task = taskInput.value;
//   if (task) {
//     await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ task })
//     });
//     taskInput.value = '';
//     fetchTodos();
//   }
// }

// fetchTodos();

const apiUrl = 'http://localhost:5000/api/todos';

// Fetch and display todos
function fetchTodos() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayTodos(data))
    .catch(error => console.error('Error fetching todos:', error));
}

// Display todos in the list
function displayTodos(todos) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.textContent = todo.task;

    // Create and append delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTodo(todo._id);  // Pass the todo ID
    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);
  });
}

// Add a new todo
document.getElementById('add-btn').addEventListener('click', () => {
  const taskInput = document.getElementById('task-input');
  const task = taskInput.value.trim();
  if (task) {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task })
    })
    .then(response => response.json())
    .then(data => {
      taskInput.value = '';  // Clear input field
      fetchTodos();  // Refresh the list
    })
    .catch(error => console.error('Error adding todo:', error));
  }
});

// Delete a todo
function deleteTodo(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Todo deleted:', data);
    fetchTodos();  // Refresh the list
  })
  .catch(error => console.error('Error deleting todo:', error));
}

// Initial fetch of todos
fetchTodos();

