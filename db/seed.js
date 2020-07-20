const mongoose = require('mongoose');
const User = require('../lib/models/User');
const Address = require('../lib/models/Address');
const Campaign = require('../lib/models/Campaign');
const chance = require('chance').Chance();

module.exports = async({ usersToCreate = 1, addressesToCreate = 1, campaignsToCreate = 1 } = {}) => {

  const seeduser = await User.create({
    email: 'seed@test.com',
    password: 'seedtest',
    firstName: 'Seed',
    lastName: 'Test'
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

  const campaigns = await Campaign.create([...Array(campaignsToCreate)].map(() => ({
    authorId: mongoose.Types.ObjectId(chance.pickone(users)._id),
    title: chance.sentence({ words: 3 }),
    description: chance.sentence(),
    recipient: chance.name(),
    addressId: mongoose.Types.ObjectId(chance.pickone(addresses)._id),
    defaultPostcardId: 'postcard ID to come',
  })));

};
