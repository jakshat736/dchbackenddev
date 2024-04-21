const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const inviteSchema= new Schema({

	inviteId:{
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
        coverVideo:{
               type:String,
               default:""
                 },
 	 invitationVideo:{
               type:String,
               default:""
                },

       
});

const Invite=mongoose.model('Invite',inviteSchema);
module.exports=Invite;
