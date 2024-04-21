const mongoose = require('mongoose');
const selfOrderSchema = new mongoose.Schema({
    productName: {
        type: String,
        default:''
    },
	orderDate:{type:String,default:''},
    number: {
        type: String,
        default:''
    },
    orderDetails: {
        type: String,
        default:''
    },
	totalAmount:{
	type:String,
	default:''},
    trackingId:{
        type:String,
        default:''
        },
    gstNo:{
        type:String,
        default:''
        },
    payment: {
        type: String,
        default:''
    },
    address: {
        type: String,
        default:''
    },
});
const selfOrders = mongoose.model('selfOrders', selfOrderSchema);
module.exports = selfOrders;
