const { json } = require('express');
var express = require('express');
const upload = require('./multer');
const pool = require('./pool');
var router = express.Router();
var menuLink=require('./Schemas/menuLinkSchema');

/* GET home page. */

  router.post('/add',upload.any(),async(req,res)=>{
	const {menuId,restaurantName}=req.body
	var updatedMenuId=menuId;
        try{
	  const company = await menuLink.findOne({"menuId":menuId})
	if(company){
	 let suffix = 0;
      while (await menuLink.findOne({ "menuId": updatedMenuId })) {
        suffix++;
        updatedMenuId = `${menuId}${suffix}`;
      }
	}
        const company1=new menuLink({"menuId":updatedMenuId,restaurantName:restaurantName});
        await company1.save();

        return res.status(200).json({status:true,data:company1})
        }catch(error){
console.log(error)
      return res.status(500).json({status:false})
}





        })

router.post("/delete",upload.single(''), async (req, res) => {
   const {_id}=req.body


try {
   await menuLink.deleteOne({"_id":_id});


    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post('/edit',upload.any(),async(req,res)=>{

      const {_id,companyId,link}=req.body;

        try{

        const company = await menuLink.findOne({_id})

        if(company){

                company.companyId=companyId;
                company.link=link;
                 await company.save();

        return res.status(200).json({status:true,data:company})

        }

        }catch(error){
console.log(error)
      return res.status(500).json({status:false})
}
 })

router.post('/checkCompanyName',upload.any(),async(req,res)=>{

      const {menuId}=req.body;

        try{

        const company = await menuLink.findOne({"menuId":menuId})

        if(company){

        return res.status(200).json({status:true,data:company})

        }else{

        return res.status(404).json({status:false})
        }

        }catch(error){
console.log(error)
      return res.status(500).json({status:false})
}
 })


 router.get('/display', async (req, res) => {



    try {
      const company = await menuLink.find();
      return  res.status(200).json(company)
    } catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    }
  });


module.exports = router;
