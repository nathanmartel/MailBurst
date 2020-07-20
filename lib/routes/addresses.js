const { Router } = require('express');
const Address = require('../models/Address');

module.exports = Router()
  .post('/', (req, res, next) => {
    Address
      .create(req.body)
      .then(address => res.send(address))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Address
      .findById(req.params.id)
      .then(address => res.send(address))
      .catch(next);
  });
