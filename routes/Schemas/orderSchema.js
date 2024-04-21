const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    name: {
        type: String,
        default:''
    },
    phone: {
        type: String,
        default:''
    },
    email: {
        type: String,
        default:''
    },
    date:{
	type:String,
	default:''
	},
    status:{
	type:String,
	default:''
	},
    fullAddress: {
        type: String,
        default:''
    },
    city: {
        type: String,
        default:''
    },
    state: {
        type: String,
        default:''
    },
    pincode: {
        type: String,
        default:''
    },
    products:{
      type:Array},
    payment: {
        type: String,
        default:'Not Done'
    },




});

const orders = mongoose.model('orders', orderSchema);

module.exports = orders;
