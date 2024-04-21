const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const cardEnquirySchema= new Schema({
 	cardId:{
	type:String,
	required:true
		},
        name:{
               type:String,
               default:''
                },
        number:{
                type:String,
                default:''
        },
        query:{
                type:String,
                default:''
        },
});

const CardEnquiry=mongoose.model('CardEnquiries',cardEnquirySchema);
module.exports=CardEnquiry;
