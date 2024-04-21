const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  mobile: {
    type: String,
    unique: true, },
  products:[{
    productId: String,
    productName:String,
    count: Number,
    companyName:String,
    Logo:String,
    Link:String,
    Description:String,
   
  }]

});

module.exports = mongoose.model('Cart', cartSchema);
