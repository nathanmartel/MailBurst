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
      .populate('postcardIdsVirtual')
      .then(campaigns => res.send(campaigns))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Campaign
      .findById(req.params.id)
      .populate('addressId')
      .populate('postcardIds')
      .then(campaign => res.send(campaign))
      .catch(next);
  });
