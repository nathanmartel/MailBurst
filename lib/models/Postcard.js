const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
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

module.exports = mongoose.model('Postcard', schema);
