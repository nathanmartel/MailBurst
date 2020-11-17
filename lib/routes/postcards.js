const { Router } = require('express');
const Postcard = require('../models/Postcard');
const LobLiveMode = false;
const Lob = LobLiveMode 
  ? require('lob')(process.env.LOB_SECRET_LIVE_KEY) 
  : require('lob')(process.env.LOB_SECRET_TEST_KEY);

module.exports = Router()
  .post('/', (req, res, next) => {
    Postcard
      .create(req.body)
      .then(postcard => res.send(postcard))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Postcard
      .find()
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
  .post('/send/:id', async(req, res, next) => {
    const postcard = await Postcard.findById(req.params.id).exec();
    const campaign = await Postcard.supplyCampaignFromPostcardId(req.params.id);
    const address = await Postcard.supplyAddressFromPostcardId(req.params.id);
    Lob.postcards
      .create({
        description: 'Demo Postcard job',
        to: {
          name: campaign.recipient,
          address_line1: address.street1,
          address_line2: address.street2,
          address_city: address.city,
          address_state: address.state,
          address_zip: address.zip
        },
        front: postcard.frontImage,
        back: LobLiveMode ? 'tmpl_5736ff0945a7b37' : 'tmpl_6337455a5de15c0',
        merge_variables: {
          backMessage: postcard.backMessage,
          senderName: postcard.senderName,
          senderTitle: postcard.senderTitle
        }
      })
      .then(lobRes => {
        Postcard.findByIdAndUpdate(req.params.id, { lobId: lobRes.id }, function(err, result) {
          if(err) throw err;
        });
        return lobRes;
      })
      .then(lobRes => res.send(lobRes))
      .catch(next);
  })
  .get('/user/:id', (req, res, next) => {
    Postcard
      .find({ userId: req.params.id })
      .then(postcard => res.send(postcard))
      .catch(next);
  })
;
