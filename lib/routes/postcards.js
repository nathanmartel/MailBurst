const { Router } = require('express');
const Postcard = require('../models/Postcard');
const Lob = require('lob')(process.env.LOB_SECRET_TEST_KEY);

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
  })
  .get('/send/:id', (req, res, next) => {
    Lob.postcards
      .create({
        description: 'Demo Postcard job',
        to: {
          name: 'Harry Zhang',
          address_line1: '185 Berry St',
          address_line2: '#6100',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94107'
        },
        front: '<html>Front HTML for</html>',
        back: '<html>Back HTML for</html>',
      })
      .then(lobRes => res.send(lobRes))
      .catch(next);
  });
