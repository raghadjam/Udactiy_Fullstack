import request from 'supertest';
import app from '../../src/server';

describe('GET /api/images', () => {
  it('should return 400 if filename missing', async () => {
    const res = await request(app).get('/api/images?width=100&height=100');
    expect(res.status).toBe(400);
  });

  it('should return 404 if file does not exist', async () => {
    const res = await request(app).get('/api/images?filename=nope.jpg&width=100&height=100');
    expect(res.status).toBe(404);
  });
});
