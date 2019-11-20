const mongoose = require('mongoose');

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
});


module.exports = mongoose.model('user', userSchema);
