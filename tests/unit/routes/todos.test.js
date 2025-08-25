const request = require('supertest');
const express = require('express');
const todoRoutes = require('../../../src/routes/todos');

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

describe('Todo Routes', () => {
  describe('GET /api/todos', () => {
    it('should return list of todos', async () => {
      const response = await request(app)
        .get('/api/todos')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const newTodo = {
        title: 'Test todo',
        completed: false
      };

      const response = await request(app)
        .post('/api/todos')
        .send(newTodo)
        .expect(201);

      expect(response.body).toMatchObject({
        title: 'Test todo',
        completed: false
      });
      expect(response.body.id).toBeDefined();
    });

    it('should return 400 for invalid todo data', async () => {
      const invalidTodo = {
        title: '',
        completed: false
      };

      await request(app)
        .post('/api/todos')
        .send(invalidTodo)
        .expect(400);
    });
  });
});