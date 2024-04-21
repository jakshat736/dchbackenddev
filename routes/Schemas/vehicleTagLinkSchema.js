const mongoose=require('mongoose');


const vehicleTagLinkSchema=new mongoose.Schema({


        tagId:{
           type:String,
           required:true,
           unique:true
        },
        clientName:{
                type:String,
                required:true,
                },
        masterId:{
                type:String,
                required:true,
                },
        status:{
        type:String,
        default:"InActive"
                }


});

const vehicleTagLinks=mongoose.model('vehicleTagLinks',vehicleTagLinkSchema);

module.exports=vehicleTagLinks;
