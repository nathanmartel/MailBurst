const { Router } = require('express');
const Campaign = require('../models/Campaign');

module.exports = Router()
  .post('/', (req, res, next) => {
    Campaign
      .create(req.body)
      .then(campaign => res.send(campaign))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Campaign
      .find()
      .populate('postcards')
      .then(campaigns => res.send(campaigns))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Campaign
      .findById(req.params.id)
      .populate('addressId')
      .populate('postcards')
      .then(campaign => res.send(campaign))
      .catch(next);
  })
  .get('/user/:id', (req, res, next) => {
    Campaign
      .find({ userId: req.params.id })
      .populate('postcards')
      .then(campaigns => res.send(campaigns))
      .catch(next);
  });
