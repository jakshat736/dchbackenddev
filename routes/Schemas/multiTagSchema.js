const mongoose=require('mongoose');


const multiTagSchema=new mongoose.Schema({


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
 links:{
        type:Array,
        default:[],
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

const multiTags=mongoose.model('multiTags',multiTagSchema);

module.exports=multiTags;
