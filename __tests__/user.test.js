require('dotenv').config();
require('../db/data-helpers');
const app = require('../lib/app');
const request = require('supertest');
const User = require('../lib/models/User');



describe('User model', () => {
  it ('hashes password', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'test'
    });
 
    expect(user.passwordHash).toEqual(expect.any(String));
    expect(user.toJSON().password).toBeUndefined();
  });

  it('logs in a user', async() => {
    await User.create({ 
      email: 'test@test.com', 
      password: 'test',
      createdAt: new Date()
    });
    return request(app)
      .post('/api/v1/users/login')
      .send({ 
        email: 'test@test.com', 
        password: 'test' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.com',
          createdAt: expect.any(String),
          firstName: '',
          lastName: '',
        });
      });
  });

});

