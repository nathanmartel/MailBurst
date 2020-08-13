const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  campaignId: {
    type: mongoose.Types.ObjectId,
    ref: 'Campaign',
  },
  isDefault: {
    type: Boolean,
    default: false 
  },
  frontImage: {
    type: String,
    default: '' 
  },
  frontMessage: {
    type: String,
    default: '' 
  },
  backMessage: {
    type: String,
    default: '' 
  },
  senderName: {
    type: String,
    default: '' 
  },
  senderTitle: {
    type: String,
    default: '' 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { 
  toJSON: { 
    transform: (doc, ret) => { 
      delete ret.id; 
      delete ret.__v; 
    }  
  } 
});

schema.statics.supplyCampaignFromPostcardId = async function(postcardId) {
  const postcard = await this.model('Postcard').findById(postcardId).exec();
  const campaign = await this.model('Campaign').findById(postcard.campaignId).exec();
  return campaign;
};

schema.statics.supplyAddressFromPostcardId = async function(postcardId) {
  const postcard = await this.model('Postcard').findById(postcardId).exec();
  const campaign = await this.model('Campaign').findById(postcard.campaignId).exec();
  const address = await this.model('Address').findById(campaign.addressId).exec();
  return address;
};

module.exports = mongoose.model('Postcard', schema);
