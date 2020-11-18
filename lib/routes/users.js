const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const User = require('../models/User');
const jwtDecode = require('jwt-decode');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const handleAuthorization = (res, user) => {
  const token = user.authToken();
  res.cookie('token', token, {
    maxAge: ONE_DAY_IN_MS,
    httpOnly: true
  });
  const expiresAt = jwtDecode(token).exp;
  const userInfo = user.toJSON(); 
  res.send({ token, userInfo, expiresAt });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })
  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  })
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
