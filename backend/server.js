// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const port = 5000;

// app.use(express.json()); // Middleware to parse JSON
// app.use(cors()); // Middleware to handle CORS

// // Define the Todo schema and model
// const todoSchema = new mongoose.Schema({
//   task: { type: String, required: true },
//   completed: { type: Boolean, default: false }
// });
// const Todo = mongoose.model('Todo', todoSchema);

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/todo', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // POST route to add a new Todo
// app.post('/api/todos', async (req, res) => {
//   console.log('POST request received with body:', req.body);
//   try {
//     const newTodo = new Todo({
//       task: req.body.task
//     });
//     const savedTodo = await newTodo.save();
//     console.log('New Todo saved:', savedTodo);
//     res.status(201).json(savedTodo);
//   } catch (err) {
//     console.error('Error saving Todo:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get('/api/todos', async (req, res) => {
//   try {
//     const todos = await Todo.find();  // Retrieve todos from MongoDB
//     res.json(todos);  // Send todos as JSON response
//   } catch (err) {
//     res.status(500).json({ error: err.message });  // Send error response
//   }
// });
// app.delete('/api/todos/:id', async (req, res) => {
//   try {
//     const todoId = req.params.id;
//     const result = await Todo.findByIdAndDelete(todoId);  // Delete todo by ID
//     if (!result) {
//       return res.status(404).json({ error: 'Todo not found' });  // If no todo found
//     }
//     res.json({ message: 'Todo deleted successfully' });  // Success message
//   } catch (err) {
//     res.status(500).json({ error: err.message });  // Send error response
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());  // Enable CORS

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the schema and model
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false }
});
const Todo = mongoose.model('Todo', todoSchema);

// GET route for fetching todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();  // Retrieve todos from MongoDB
    res.json(todos);  // Send todos as JSON response
  } catch (err) {
    res.status(500).json({ error: err.message });  // Send error response
  }
});

// POST route for adding a todo
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      completed: req.body.completed
    });
    const savedTodo = await newTodo.save();  // Save new todo to MongoDB
    res.json(savedTodo);  // Send saved todo as JSON response
  } catch (err) {
    res.status(500).json({ error: err.message });  // Send error response
  }
});

// DELETE route for deleting a todo by ID
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    const result = await Todo.findByIdAndDelete(todoId);  // Delete todo by ID
    if (!result) {
      return res.status(404).json({ error: 'Todo not found' });  // If no todo found
    }
    res.json({ message: 'Todo deleted successfully' });  // Success message
  } catch (err) {
    res.status(500).json({ error: err.message });  // Send error response
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
