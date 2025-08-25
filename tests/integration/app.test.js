const request = require('supertest');
const app = require('../../src/app');

describe('App Integration Tests', () => {
  describe('API Integration', () => {
    it('should handle complete todo workflow', async () => {
      // Create a todo
      const createResponse = await request(app)
        .post('/api/todos')
        .send({
          title: 'Integration test todo',
          completed: false
        })
        .expect(201);

      const todoId = createResponse.body.id;

      // Get the todo
      const getResponse = await request(app)
        .get(`/api/todos/${todoId}`)
        .expect(200);

      expect(getResponse.body.title).toBe('Integration test todo');

      // Update the todo
      await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ completed: true })
        .expect(200);

      // Delete the todo
      await request(app)
        .delete(`/api/todos/${todoId}`)
        .expect(204);

      // Verify deletion
      await request(app)
        .get(`/api/todos/${todoId}`)
        .expect(404);
    });
  });
});