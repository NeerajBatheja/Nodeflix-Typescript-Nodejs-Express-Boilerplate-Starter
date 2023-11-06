import request from 'supertest'
import app from '../src/app'

describe('/api/protected', () => {
  it('should return 401 when not authenticated', async () => {
    const response = await request(app).get('/api/protected')
    expect(response.status).toBe(401)
  })

  it('should return 200 when authenticated', async () => {
    // Replace this with code to authenticate and obtain a token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImV4YW1wbGVVc2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.KZVQUlrwOm-HIOn9lD3ppHgDdEnn6q5xmLXVkVgjXys'

    const response = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })
})
