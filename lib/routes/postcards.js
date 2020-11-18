const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Postcard = require('../models/Postcard');
const LobLiveMode = false;
const Lob = LobLiveMode 
  ? require('lob')(process.env.LOB_SECRET_LIVE_KEY) 
  : require('lob')(process.env.LOB_SECRET_TEST_KEY);

module.exports = Router()

  // Creates postcard
  .post('/', ensureAuth, (req, res, next) => {
    Postcard
      .create(req.body)
      .then(postcard => res.send(postcard))
      .catch(next);
  })
  
  // Gets all postcards
  .get('/', (req, res, next) => {
    Postcard
      .find()
      .then(postcard => res.send(postcard))
      .catch(next);
  })

  // Gets specific postcard
  .get('/:id', ensureAuth, (req, res, next) => {
    Postcard
      .findById(req.params.id)
      .then(postcard => res.send(postcard))
      .catch(next);
  })

  // Updates specific postcard
  .patch('/:id', ensureAuth, (req, res, next) => {
    Postcard
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(postcard => res.send(postcard))
      .catch(next);
  })

  // Sends specific postcard to Lob
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

  // Gets all postcards by a specific user
  .get('/user/:id', ensureAuth, (req, res, next) => {
    Postcard
      .find({ userId: req.params.id })
      .then(postcard => res.send(postcard))
      .catch(next);
  })
;
