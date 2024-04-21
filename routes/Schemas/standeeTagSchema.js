const mongoose=require('mongoose');


const standeeTagSchema=new mongoose.Schema({


        tagId:{
           type:String,
           required:true,
           unique:true
        },
         name: {
    type: String,
    required: true
  },
    email: {
    type: String,
    required: true,
    unique:true
  },
    phone: {
    type: Number,
    required: true,
    minLength:10,
    maxLength:12,
     },
    password: {
    type: String,
    required: true,
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


});

const standeeTags=mongoose.model('standeeTags',standeeTagSchema);

module.exports=standeeTags;
