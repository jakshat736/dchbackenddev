const express = require('express');
const router = express.Router();
const customerLogin = require('./Schemas/customerLoginSchema');
const CardDetails = require("./Schemas/cardDetailsSchema");
const reviewTags = require('./Schemas/reviewTagSchema');
var upload = require("./multer")
const uuid = require('uuid');
var pool = require('./pool')
const nodemailer = require('nodemailer');
router.post('/customerLogin', upload.single(), async (req, res) => {
    let { name, email, phone, password,masterId} = req.body;
    console.log(req.body);
    try {
      let customer = await customerLogin.findOne({ $or: [{ email }] });
      console.log(!customer);
  
      if (!customer) {
        customer = new customerLogin({ name, email, phone, password,masterId });
        await customer.save();
        console.log(customer._id);
        return res
          .status(200)
          .json({ status: 'true', data: customer, message: 'Login successful' });
      } else {
        console.log(
    'assjksn'
        )
        return res.status(200).json({
          status: 'exist',
          mobileNumber: phone,
          message: 'Phone number already registered',
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/deleteUser',upload.single(''), async (req, res) => {
  const { _id } = req.body;

  try {
    // Check if a reviewTag with the provided tagId exists
    const user = await customerLogin.findOne({ _id });

    if (user) {
	console.log(user)
	const user1 = await customerLogin.deleteOne({_id});
	const reviewtag= await reviewTags.deleteMany({email:user.email})
	const card = await CardDetails.deleteOne({customerId:_id})
      // Delete the reviewTag


      return res.status(200).json({ status: true, message: 'ReviewTag deleted successfully' });
    } else {
      return res.status(404).json({ status: false, message: 'ReviewTag not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


  
router.post('/address',upload.single(''),async(req,res)=>{

let{_id}=req.body;
let addressData=JSON.parse(req.body.address);
console.log(req.body.address)
try{
 let customer =await customerLogin.findOne({_id});
  
 if(!customer){
	return res.status(404).json({message:"not found"});
}

customer.address=addressData;
await customer.save();
return res.status(200).json({status:true,message:"found"});



}catch(err){

console.log(err)
return res.status(500).json({message:"server error"});

}

})

router.post('/chkUser',upload.single(''), async (req, res) => {
    const { email, phone } = req.body;

    try {
      let customer = await customerLogin.findOne({email});
      console.log(!customer);

      if (!customer) {
     
        return res
          .status(200)
          .json({ status: 'false', mobileNumber: phone, message: 'User Not Found' });
      } else {
        console.log(
    'assjksn'
        )
        return res.status(200).json({
          status: 'exist',
          mobileNumber: phone,
          message: 'User Exist',
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

  });

router.post('/chkLogin',upload.single(''), async (req, res) => {
    const { phone,masterId } = req.body;
  
    try {
      // Check if a customer with the provided email exists
      let customer = await customerLogin.findOne({ phone });
  
      if (customer) {
          return res.status(200).json({ status: true,data:customer, message: 'Login successful' });
      } else {
        customer = new customerLogin({ phone,masterId });
        await customer.save();
        console.log(customer._id);
        return res
          .status(200)
          .json({ status: 'true', data: customer, message: 'Login successful' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/getUserDataById',upload.single(''), async (req, res) => {
    try {
      const { _id } = req.body;
  
      const customer = await customerLogin.findOne({ _id });
  
      if (!customer) {
        return res.status(404).json({ error: 'User details not found' });
      }
  
      return res.status(200).json({status:true,data:customer});
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Failed to retrieve user details' });
    }
  });

 router.get('/displayalluser', async (req, res) => {
    try {
   

      const customer = await customerLogin.find();

      if (!customer) {
        return res.status(404).json({ error: 'User details not found' });
      }

      return res.status(200).json({status:true,data:customer});
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Failed to retrieve user details' });
    }
  });




  router.get('/displayallusers', async (req, res) => {
    try {
      const customers = await customerLogin.find();
  
      if (!customers || customers.length === 0) {
        return res.status(404).json({ error: 'User details not found' });
      }
  
      const userData = await Promise.all(customers.map(async (customer) => {
        const card = await CardDetails.findOne({ customerId: customer._id });
        return {
          ...customer.toObject(),
          companyId: card ? card.companyId : null // check if card exists
        };
      }));
  
      return res.status(200).json({ status: true, data: userData });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to retrieve user details' });
    }
  });
  



	router.post('/displayallusersbymasterid',upload.single(''), async (req, res) => {
    try {
	const {masterId}=req.body

      const customer = await customerLogin.find({masterId});

      if (!customer) {
        return res.status(404).json({ error: 'User details not found' });
      }

      return res.status(200).json({status:true,data:customer});
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Failed to retrieve user details' });
    }
  });


  router.post('/updatePassword',upload.single(''),async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if a customer with the provided email exists
      const customer = await customerLogin.findOne({ email });
  
      if (customer) {
        // Update the password
        customer.password = password;
        await customer.save();
        
        return res.status(200).json({ status: true, message: 'Password updated successfully' });
      } else {
        return res.status(404).json({ status: false, message: 'Customer not found' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  


  module.exports = router;