const mongoose=require('mongoose');


const doorTagLinkSchema=new mongoose.Schema({


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

const doorTagLinks=mongoose.model('doorTagLinks',doorTagLinkSchema);

module.exports=doorTagLinks;
