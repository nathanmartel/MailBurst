const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  author: {
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
  address: {
    type: mongoose.Types.ObjectId,
    ref: 'Address',
  },
  postcard: {
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
