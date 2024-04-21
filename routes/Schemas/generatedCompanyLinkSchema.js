const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const generatedCompanyLinkSchema= new Schema({

        companyId:{
               type:String,
                default:''},
        link:{
                type:String,
                default:''},
       
});

const GeneratedCompanyLink=mongoose.model('GeneratedCompanyLink',generatedCompanyLinkSchema);
module.exports=GeneratedCompanyLink;
