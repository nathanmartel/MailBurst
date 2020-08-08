const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: '' 
  },
  recipient: {
    type: String,
    default: '' 
  },
  addressId: {
    type: mongoose.Types.ObjectId,
    ref: 'Address',
  },
  defaultPostcardId: {
    type: mongoose.Types.ObjectId,
    ref: 'Postcard',
  }
}, { 
  toJSON: { 
    virtuals: true,
    transform: (doc, ret) => { 
      delete ret.id; 
      delete ret.__v; 
    }  
  } 
});

schema.virtual('postcards', {
  ref: 'Postcard',
  localField: '_id',
  foreignField: 'campaignId'
});

module.exports = mongoose.model('Campaign', schema);
