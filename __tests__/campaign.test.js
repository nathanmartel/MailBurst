require('dotenv').config();
const app = require('../lib/app');
const request = require('supertest');
const { getUser, getAddress, getCampaign, getPostcard } = require('../db/data-helpers');

describe('Campaign model', () => {
  it('creates a campaign', async() => {
    
    const user = await getUser();
    const address = await getAddress();
    const postcard = await getPostcard();

    return request(app)
      .post('/api/v1/campaigns/')
      .send({ 
        userId: user._id,
        title: 'Test Campaign', 
        recipient: 'John Doe',
        addressId: address._id,
        defaultPostcardId: postcard._id 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          userId: user._id,
          title: 'Test Campaign', 
          description: '', 
          recipient: 'John Doe',
          addressId: address._id,
          defaultPostcardId: postcard._id
        });
      });
  });

  it('gets a specific campaign', async() => {

    const campaign = await getCampaign();

    return request(app)
      .get(`/api/v1/campaigns/${campaign._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: campaign._id,
          userId: campaign.userId, 
          title: campaign.title, 
          description: campaign.description,
          recipient: campaign.recipient,
          addressId: campaign.addressId,
          defaultPostcardId: campaign.defaultPostcardId,
        });
      });
  });


});
