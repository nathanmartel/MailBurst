const { Router } = require('express');
const Campaign = require('../models/Campaign');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()

  // Creates campaign
  .post('/', ensureAuth, (req, res, next) => {
    Campaign
      .create(req.body)
      .then(campaign => res.send(campaign))
      .catch(next);
  })

  // Gets all campaigns
  .get('/', (req, res, next) => {
    Campaign
      .find()
      .populate('postcards')
      .then(campaigns => res.send(campaigns))
      .catch(next);
  })

  // Gets specific campaign
  .get('/:id', (req, res, next) => {
    Campaign
      .findById(req.params.id)
      .populate('addressId')
      .populate('postcards')
      .then(campaign => res.send(campaign))
      .catch(next);
  })

  // Gets all campaigns by a specific user
  .get('/user/:id', ensureAuth, (req, res, next) => {
    Campaign
      .find({ userId: req.params.id })
      .populate('postcards')
      .then(campaigns => res.send(campaigns))
      .catch(next);
  });
