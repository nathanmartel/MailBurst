const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'An account with this email address already exists']
  },
  passwordHash: {
    type: String, 
    required: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''  
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { 
  toJSON: { 
    virtuals: true,
    transform: (doc, ret) => { 
      delete ret.id; 
      delete ret.passwordHash; 
      delete ret.__v; 
    }  
  } 
});

schema.virtual('password').set(function(password) {
  const hash = bcrypt.hashSync(password, 10);
  this.passwordHash = hash;
});
  
schema.statics.authorize = async function({ email, password }) {
  const user = await this.findOne({ email });
  if(!user) {
    const error = new Error('Invalid username/password');
    error.status = 401;
    throw error;
  }
  
  const matchingPasswords = await bcrypt.compare(password, user.passwordHash);
  if(!matchingPasswords) {
    const error = new Error('Invalid username/password');
    error.status = 401;
    throw error;
  }
  return user;
};

schema.statics.findByToken = function(token) {
  try {
    const { payload } = jwt.verify(token, process.env.APP_SECRET);
    return Promise.resolve(this.hydrate(payload));
  } catch(e) {
    return Promise.reject(e);
  }
};

schema.methods.authToken = function() {
  const token = jwt.sign({ payload: this.toJSON() }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });  
  return token;
};

module.exports = mongoose.model('User', schema);
