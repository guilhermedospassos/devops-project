const request = require('supertest');
const express = require('express');
const healthRoutes = require('../../../src/routes/health');

const app = express();
app.use('/health', healthRoutes);

describe('Health Route', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'OK',
        environment: expect.any(String)
      });
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.uptime).toBeDefined();
    });
  });
});