const mongoose=require('mongoose');


const inviteLinkSchema=new mongoose.Schema({


        inviteId:{
           type:String,
           required:true,
           unique:true
        },
        inviteName:{
                type:String,
                required:true,
                }


});

const inviteLinks=mongoose.model('inviteLinks',inviteLinkSchema);

module.exports=inviteLinks;
