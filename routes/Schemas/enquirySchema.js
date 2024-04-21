const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const enquirySchema= new Schema({
    
	name:{
	       type:String,
		default:''},
	number:{
		type:String,
		default:''},
	query:{
		type:String,
		default:''},
	email:{
		type:String,
		default:''
		},
});

const Enquiry=mongoose.model('Enquiries',enquirySchema);
module.exports=Enquiry;
