const mongoose = require('mongoose');


const doorTagSchema = new mongoose.Schema({

  tagId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,

  },
  email: {
    type: String,

  },
  phone: {
    type: Number,
    required: true,
    minLength: 10,
    maxLength: 12,
  },
  password: {
    type: String,

  },
  status: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  createdDate: {
    type: String,
    default: ''
  },

});

const doorTags = mongoose.model('doorTags', doorTagSchema);

module.exports = doorTags;
