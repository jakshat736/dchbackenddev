const mongoose=require('mongoose');


const reviewTagLinkSchema=new mongoose.Schema({


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

const reviewTagLinks=mongoose.model('reviewTagLinks',reviewTagLinkSchema);

module.exports=reviewTagLinks;
