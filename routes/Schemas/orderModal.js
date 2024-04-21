const mongoose = require("mongoose");

const menuOrderSchema = mongoose.Schema (

{
    menuId:{
	type:String,
	required:true
	},
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    message:{
        type:String,
    },
    table:{
        type:String,
        required:true,
    },
 Number:{
        type:String,
    },
 totalPrice:{
        type:String,
        required:true,
    },
    dishes:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        default:"order placed"
    },
    waiterCalled:{
	type:String,
	default:"No"
	}
}

)
module.exports = mongoose.model("MenuOrder",menuOrderSchema);
