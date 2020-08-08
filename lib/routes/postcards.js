const { Router } = require('express');
const Postcard = require('../models/Postcard');

module.exports = Router()
  .post('/', (req, res, next) => {
    Postcard
      .create(req.body)
      .then(postcard => res.send(postcard))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Postcard
      .findById(req.params.id)
      .then(postcard => res.send(postcard))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Postcard
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(postcard => res.send(postcard))
      .catch(next);
  });
