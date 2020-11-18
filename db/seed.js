const User = require('../lib/models/User');
const Address = require('../lib/models/Address');
const Campaign = require('../lib/models/Campaign');
const Postcard = require('../lib/models/Postcard');
const chance = require('chance').Chance();

module.exports = async({ usersToCreate = 1, addressesToCreate = 1, campaignsToCreate = 1, postcardsToCreate = 1 } = {}) => {

  // Create specific seed users for model testing
  await User.create({
    email: 'seed@test.com',
    password: 'seedtest',
    firstName: 'Seed',
    lastName: 'Test',
  });

  await User.create({
    email: 'admin@test.com',
    password: 'admintest',
    firstName: 'Admin',
    lastName: 'Test',
    role: 'admin'
  });

  const users = await User.create([...Array(usersToCreate)].map(() => ({
    email: chance.email(),
    password: chance.animal()
  })));

  const addresses = await Address.create([...Array(addressesToCreate)].map(() => ({
    street1: chance.address(),
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip()
  })));

  const postcards = await Postcard.create([...Array(postcardsToCreate)].map(() => ({
    userId: chance.pickone(users)._id,
    title: 'Test Postcard', 
    frontImage: 'http://placekitten.com/200/300',
    backMessage: 'Lorem ipsum dolor',
    senderName: 'Jane Doe',
  })));

  const campaigns = await Campaign.create([...Array(campaignsToCreate)].map(() => ({
    userId: chance.pickone(users)._id,
    title: chance.sentence({ words: 3 }),
    description: chance.sentence(),
    recipient: chance.name(),
    addressId: chance.pickone(addresses)._id,
    defaultPostcardId: chance.pickone(postcards)._id,
  })));

};
