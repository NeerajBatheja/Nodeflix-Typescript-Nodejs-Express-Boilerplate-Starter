import path from 'path';
import request from 'supertest'
import app, { startBooting } from '../src/app' 

beforeAll(async ()=>{

  await startBooting()
})

describe('/api/protected-route',  function () {
  it('should return 401 when not authenticated', async () => {
    const response = await request(app).get('/api/protected-route')
    expect(response.status).toBe(401)
  })

  it('should return a 200 response with a valid token', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImV4YW1wbGVVc2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.KZVQUlrwOm-HIOn9lD3ppHgDdEnn6q5xmLXVkVgjXys';

    const response = await request(app)
      .get('/api/protected-route')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({
        username: 'aaa',
        email: 'neeraj@gmail.com',
      });

    expect(response.status).toBe(200);
  });
})
