const mongoose = require('mongoose');

const masterIdSchema = new mongoose.Schema({

    name: {
    type: String,
    required: true
  },
    email: {
    type: String,
    required: true,
    unique:true
  },
    password: {
    type: String,
    required: true,
  },

});

const masterId = mongoose.model('masterId', masterIdSchema);

module.exports = masterId;
