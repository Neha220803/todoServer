const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let todos = [];

// Get all todos
app.get('/api/tasks', (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post('/api/tasks', (req, res) => {
    const newTodo = {
        id: uuidv4(),
        ...req.body
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Edit an existing todo
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index] = { id, ...req.body };
        res.json(todos[index]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Delete a todo
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.listen(process.env.PORT, () => {
    console.log('Server is running');
});