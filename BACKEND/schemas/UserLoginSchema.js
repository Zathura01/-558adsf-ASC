const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,        
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6         
  }
}, {
  timestamps: true       
});

const LoginModel = mongoose.model('Login', LoginSchema);

module.exports = LoginModel;
