require('dotenv').config();
const app = require('../lib/app');
const request = require('supertest');
const mongoose = require('mongoose');
const { getUser, getCampaign, getPostcard } = require('../db/data-helpers');
const Postcard = require('../lib/models/Postcard');

describe('Postcard model', () => {
  it('creates a postcard', async() => {
    
    const user = await getUser();
    const campaign = await getCampaign();

    return request(app)
      .post('/api/v1/postcards/')
      .send({ 
        userId: user._id,
        campaignId: campaign._id,
        title: 'Test Postcard', 
        frontImage: 'http://placekitten.com/200/300',
        backMessage: 'Lorem ipsum dolor',
        senderName: 'Jane Doe',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          userId: user._id,
          campaignId: campaign._id,
          isDefault: false, 
          frontImage: 'http://placekitten.com/200/300',
          frontMessage: '',
          backMessage: 'Lorem ipsum dolor',
          senderName: 'Jane Doe',
          senderTitle: '',
          createdAt: expect.any(String),
        });
      });
  });

  it('gets a specific postcard', async() => {

    const postcard = await getPostcard();

    return request(app)
      .get(`/api/v1/postcards/${postcard._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: postcard._id,
          userId: postcard.userId, 
          campaignId: postcard.campaignId,
          isDefault: false, 
          frontImage: postcard.frontImage,
          frontMessage: postcard.frontMessage,
          backMessage: postcard.backMessage,
          senderName: postcard.senderName,
          senderTitle: postcard.senderTitle,
          createdAt: postcard.createdAt,
        });
      });
  });


});
