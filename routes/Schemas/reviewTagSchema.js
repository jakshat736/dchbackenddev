const mongoose=require('mongoose');


const reviewTagSchema=new mongoose.Schema({


	tagId:{
	   type:String,
	   required:true,
	   unique:true
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
    minLength:10,
    maxLength:12,
  },
    password: {
    type: String,
  },
    status:{
	type:String,
	default:''
	},
	link:{
	type:String,
	default:''
	},
	createdDate:{
	type:String,
	default:''
	},
	masterId:{
	type:String,
	dafault:''
	}

});

const reviewTags=mongoose.model('reviewTags',reviewTagSchema);

module.exports=reviewTags;


