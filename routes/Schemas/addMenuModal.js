const mongoose = require("mongoose");

const addMenuSchema = mongoose.Schema(

  { 
     menuId:{
        type:String,
        required:true
        },

    dish:{
        type:String,
        required:true,
    },
   
    price:{
        type:String,
        required:true,
    },
    Halfprice:{
        type:String,
        default:""
    },
    rating:{
        type:String,
        required:true,
    },
    sorting:{
        type:String,
        required:true,
    },
    stock:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    foodtype:{
        type:String,
        required:true,
    },
    Image:{
        type:String,
        required:true,
    }
 }



);
module.exports = mongoose.model("addmenu",addMenuSchema);
