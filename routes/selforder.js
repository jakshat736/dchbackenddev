const { json } = require('express');
var express = require('express');
const upload = require('./multer');
const pool = require('./pool');
var router = express.Router();
var SelfOrder=require('./Schemas/selfOrderSchema');

/* GET home page. */

  router.post('/add',upload.any(),async(req,res)=>{
	
      const {productName,orderDate,number,orderDetails,totalAmount,trackingId,gstNo,payment,address}=req.body;

	try{
	
	const selforder=new SelfOrder(req.body);
	await selforder.save();
	
	return res.status(200).json({status:true,data:selforder})
	
	
	
	}catch(error){
console.log(error)
      return res.status(500).json({status:false})
}

			



	})

router.post("/delete",upload.single(''), async (req, res) => {
   const {_id}=req.body


try {
   await SelfOrder.deleteOne({"_id":_id});


    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/edit',upload.any(),async(req,res)=>{

      const {_id,productName,number,orderDetails,totalAmount,trackingId,gstNo,payment,address}=req.body;

        try{

        const selforder = await SelfOrder.findOne({_id})

	if(selforder){
		
		selforder.productName=productName;
		selforder.number=number;
		selforder.orderDetails=orderDetails;
		selforder.totalAmount=totalAmount;
		selforder.trackingId=trackingId;
		selforder.gstNo=gstNo;
		selforder.payment=payment;
		selforder.address=address;
			
		 await selforder.save();

        return res.status(200).json({status:true,data:selforder})
		
	}

        }catch(error){
console.log(error)
      return res.status(500).json({status:false})
}
 })  
  
  
  router.get('/displayallselforders', async (req, res) => {
   
    

    try {
      const selforder = await SelfOrder.find();
      return  res.status(200).json(selforder)
    } catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    }
  });

 
module.exports = router;
