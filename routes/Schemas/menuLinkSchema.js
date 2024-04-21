const mongoose=require('mongoose');


const menuLinkSchema=new mongoose.Schema({


        menuId:{
           type:String,
           required:true,
           unique:true
        },
        restaurantName:{
                type:String,
                required:true,
                }


});

const menuLinks=mongoose.model('menuLinks',menuLinkSchema);

module.exports=menuLinks;
