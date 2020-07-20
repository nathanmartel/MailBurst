require('dotenv').config();
const app = require('../lib/app');
const request = require('supertest');
const { getAddress } = require('../db/data-helpers');
const Address = require('../lib/models/Address');

describe('Address model', () => {
  it('creates an address', async() => {
    await Address.create({ 
      street1: '123 Somewhere St.', 
      city: 'Portland',
      state: 'OR',
      zip: '97202',
    });
    return request(app)
      .post('/api/v1/addresses/')
      .send({ 
        street1: '123 Somewhere St.', 
        city: 'Portland',
        state: 'OR',
        zip: '97202' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          street1: '123 Somewhere St.', 
          street2: '', 
          city: 'Portland',
          state: 'OR',
          zip: '97202' });
      });
  });

  it('gets a specific address', async() => {

    await Address.create({ 
      street1: '123 Somewhere St.', 
      city: 'Portland',
      state: 'OR',
      zip: '97202',
    });

    const address = await getAddress();

    return request(app)
      .get(`/api/v1/addresses/${address._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: address._id,
          street1: address.street1, 
          street2: address.street2, 
          city: address.city,
          state: address.state,
          zip: address.zip });
      });
  });


});
