const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  street1: {
    type: String,
    required: [true, 'Street is required']
  },
  street2: {
    type: String,
    default: '' 
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  zip: {
    type: String,
    required: [true, 'Zip code is required']
  }
}, { 
  toJSON: { 
    transform: (doc, ret) => { 
      delete ret.id; 
      delete ret.__v; 
    }  
  } 
});

module.exports = mongoose.model('Address', schema);
