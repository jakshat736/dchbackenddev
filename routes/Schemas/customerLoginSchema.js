const mongoose = require('mongoose');

const customerLoginSchema = new mongoose.Schema({
  
    name: {
    type: String,
    default:""
  },
    email: {
    type: String,
    default:"",
  },
    phone: {
    type: Number,
    required: true,
    minLength:10,
    maxLength:12,
  },
    password: {
    type: String,
    default:""
  },
  address:{
	name:{type:String},
	phone:{type:String},
	email:{type:String},
	fullAddress:{type:String},
	city:{type:String},
	state:{type:String},
	pincode:{type:String}
	},
	masterId:{
	type:String,
	default:""
	},




  
});


const customerLogin = mongoose.model('customerLogin', customerLoginSchema);

module.exports = customerLogin;
