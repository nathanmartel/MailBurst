require('dotenv').config();
const app = require('../lib/app');
const request = require('supertest');
const { getUser, getAddress, getCampaign } = require('../db/data-helpers');
const Campaign = require('../lib/models/Campaign');

describe('Campaign model', () => {
  it('creates a campaign', async() => {
    
    const user = getUser();
    const address = getAddress();

    await Campaign.create({ 
      author: user._id,
      title: 'Test Campaign', 
      recipient: 'John Doe',
      address: address._id,
      postcard: 'postcard._id to come',
    });
    return request(app)
      .post('/api/v1/campaigns/')
      .send({ 
        author: user._id,
        title: 'Test Campaign', 
        recipient: 'John Doe',
        address: address._id,
        postcard: 'postcard._id to come' 
      })
      .then(res => {
        expect(res.body).toEqual({
          author: user._id,
          title: 'Test Campaign', 
          recipient: 'John Doe',
          address: address._id,
          postcard: 'postcard._id to come' 
        });
      });
  });

  it('gets a specific campaign', async() => {

    await Campaign.create({ 
      street1: '123 Somewhere St.', 
      city: 'Portland',
      state: 'OR',
      zip: '97202',
    });

    const campaign = await getCampaign();

    return request(app)
      .get(`/api/v1/campaigns/${campaign._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: campaign._id,
          author: campaign.street1, 
          title: campaign.street2, 
          description: campaign.city,
          recipient: campaign.state,
          address: campaign.zip,
          postcard: campaign.postcard,
        });
      });
  });


});
