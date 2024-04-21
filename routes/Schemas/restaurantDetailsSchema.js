const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantDetailsSchema = new Schema({

  menuId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,

  },
  restaurantName: { type: String, default: "" },
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

  number: {
    type: String,
    default: ""
  },
  logo: {
    type: String,
    default: ""
  },
  call: {
    type: String,
    default: "able"
  }

});

const RestaurantDetails = mongoose.model('RestaurantDetails', restaurantDetailsSchema);
module.exports = RestaurantDetails;
