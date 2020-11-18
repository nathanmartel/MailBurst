const { Router } = require('express');
const Address = require('../models/Address');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()

  // Creates address
  .post('/', ensureAuth, (req, res, next) => {
    Address
      .create(req.body)
      .then(address => res.send(address))
      .catch(next);
  })

  // Gets specific address
  .get('/:id', ensureAuth, (req, res, next) => {
    Address
      .findById(req.params.id)
      .then(address => res.send(address))
      .catch(next);
  });
