const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
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
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  cellphone: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const RegisterModel = mongoose.model('Register', RegisterSchema);
module.exports = RegisterModel;
