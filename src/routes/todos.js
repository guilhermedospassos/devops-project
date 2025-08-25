const express = require('express');
const Joi = require('joi');
const router = express.Router();

// In-memory storage (substituir por banco de dados em produção)
const todos = [
  { id: 1, title: 'Exemplo de tarefa', completed: false, createdAt: new Date() }
];
let nextId = 2;

// Validation schema
const todoSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  completed: Joi.boolean().default(false)
});

const updateTodoSchema = Joi.object({
  title: Joi.string().min(1).max(255),
  completed: Joi.boolean()
}).min(1);

// GET /api/todos - List all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// GET /api/todos/:id - Get specific todo
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json(todo);
});

// POST /api/todos - Create new todo
router.post('/', (req, res) => {
  const { error, value } = todoSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  const newTodo = {
    id: nextId++,
    title: value.title,
    completed: value.completed,
    createdAt: new Date()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /api/todos/:id - Update todo
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const { error, value } = updateTodoSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  todos[todoIndex] = { ...todos[todoIndex], ...value };
  res.json(todos[todoIndex]);
});

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(todoIndex, 1);
  res.status(204).send();
});

module.exports = router;