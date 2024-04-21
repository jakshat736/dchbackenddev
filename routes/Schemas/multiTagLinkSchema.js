const mongoose=require('mongoose');


const multiTagLinkSchema=new mongoose.Schema({


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

const multiTagLinks=mongoose.model('multiTagLinks',multiTagLinkSchema);

module.exports=multiTagLinks;
