const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  authorId: {
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
    type: String,
  }
}, { 
  toJSON: { 
    transform: (doc, ret) => { 
      delete ret.id; 
      delete ret.__v; 
    }  
  } 
});

module.exports = mongoose.model('Campaign', schema);
