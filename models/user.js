const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    match: /(https?:\/\/)(www\.)?(((\d{1,3}\.){3}\d{1,3})|((\w+)((-\w+)+)?\.\w{2,4}))((\.\w+)+)?(:\d{2,5})?((\/+\w+)+#?)?/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'It is not valid email',
    },
  },
  password: {
    tipe: String,
    required: true,
    minlength: 8,
  },
});


module.exports = mongoose.model('user', userSchema);
