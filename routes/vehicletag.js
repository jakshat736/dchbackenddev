const express = require('express');
const router = express.Router();
const vehicleTags = require('./Schemas/vehicleTagSchema');
const vehicleTagLinks = require('./Schemas/vehicleTagLinkSchema');
var upload = require("./multer")
const uuid = require('uuid');
var pool = require('./pool')
const nodemailer = require('nodemailer');

router.post('/chkTagId', upload.single(), async (req, res) => {
    let {tagId} = req.body;
    console.log(req.body);
    try {
      let vehicleTag = await vehicleTags.findOne({ tagId });

      if (!vehicleTag){
        return res.status(200).json({ status: 'false', message: 'Not Found' });
      } else {

     return res.status(200).json({      status: 'true',data:vehicleTag,  message: 'Found', });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


router.post('/updateVehicleNumber', upload.single(), async (req, res) => {
    let {_id,name,phone,vehicleType,vehicleNumber,status} = req.body;
    console.log(req.body);
    try {
      let vehicleTag = await vehicleTags.findOne({ _id });

      if (vehicleTag){

	vehicleTag.name=name;
	vehicleTag.phone=phone;
	vehicleTag.vehicleType=vehicleType;
	vehicleTag.vehicleNumber=vehicleNumber;
        vehicleTag.status=status
	
	await vehicleTag.save()

         return res.status(200).json({status: 'true',data:vehicleTag,  message: 'Found', });
      } else {

     return res.status(200).json({status: 'false', message: 'Not Found', });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

router.get('/displayalltaglinks', async (req, res) => {
    try {
      const cards = await vehicleTagLinks.find();
      return  res.status(200).json(cards)
    } catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    }
  });
router.post('/addTagLinkId', upload.single(), async (req, res) => {
     const {clientName,masterId}=req.body;
 try {
        // Find the last entry to get the latest tagId
          const lastEntry = await vehicleTagLinks.findOne({}).sort({ _id: -1 }).limit(1);
        console.log(lastEntry)
        let latestNumericTagId = 1; // Default to 1 if no previous entries

        if (lastEntry) {
            const lastTagId = lastEntry.tagId;
            const lastNumericTagId = parseInt(lastTagId);
            latestNumericTagId = lastNumericTagId + 1;
        }

        const tagId = `${latestNumericTagId}`;
        console.log(`Generated tagId: ${tagId}`);
        // Assuming your schema is defined as ReviewTagLinks
        const vehicleTag = new vehicleTagLinks({ tagId,clientName,masterId });

        try {
            await vehicleTag.save();
            return res.status(200).json({ status: 'true', tagId:tagId, message: 'Added' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'false', message: 'Error adding entry' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});






router.post("/updateTagStatus",upload.single(""),async(req,res)=>{
const  {tagId,status}=req.body;
console.log(req.body);
try{
const card = await vehicleTags.findOne({tagId})
if(card){
card.status=status;
await card.save();

return res.status(200).json({status:true,message:"Status Updated"});

}else{
  return res.status(404).json({status:false,message:"Not Found"});
}
}catch(err){
console.log(err);
return res.status(500).json({message:"server Error"});
}
});

router.get('/displayalltags', async (req, res) => {
    try {
      const cards = await vehicleTags.find();
      return  res.status(200).json(cards)
    } catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    }
  });
router.get('/displayalltaglinks', async (req, res) => {
    try {
      const cards = await reviewTagLinks.find();
      return  res.status(200).json(cards)
    } catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    }
  });

router.post('/getUserDataById',upload.single(''), async (req, res) => {
    try {
      const {tagId } = req.body;

      const customer = await vehicleTags.findOne({ tagId });

      if (!customer) {
        return res.status(404).json({ error: 'User details not found' });
      }

      return res.status(200).json({status:true,data:customer});
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve user details' });
    }
  });

router.post('/getTagsByPhone',upload.single(''),async(req,res)=>{

  try{  console.log(req.body.email)
        const {phone}=req.body;
        const tags=await vehicleTags.find({phone});
        if(tags.length===0){
	console.log("IN")
        return res.status(404).json({status:false,error:"Not Found"});

        }else{
        return res.status(200).json({status:true,data:tags});}
        }catch(error){
		console.log(error)
        return res.status(500).json({error:"error"});
        }

});
router.post('/updatePassword',upload.single(''),async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if a customer with the provided email exists
      const customer = await vehicleTags.findOne({ email });

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
router.post('/customerLogin', upload.single(), async (req, res) => {
  let { tagId, name, email, phone, password } = req.body;

  try {
    const currentDate = new Date(); // Get the current date and time
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const customer = new vehicleTags({
      tagId: tagId,
      name: name,
      email: email,
      phone: phone,
      password: password,
      status:"Active",
      createdDate: formattedDate, // Assign the formatted date to createdDate
    });

    await customer.save();

    console.log(customer._id);
    return res
      .status(200)
      .json({ status: 'true', data: customer, message: 'Login successful' });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/chkLogin',upload.single(''), async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if a customer with the provided email exists
      const customer = await vehicleTags.findOne({ email });

      if (customer) {
        // Compare the provided password with the stored password
        if (customer.password === password) {
          return res.status(200).json({ status: true,data:customer, message: 'Login successful' });
        } else {
          return res.status(401).json({ status: false, message: 'Incorrect password' });
        }
      } else {

        return res.status(404).json({ status: false, message: 'Customer not found' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
 router.post('/updateLink',upload.single(''),async (req, res) => {
    const { tagId,link } = req.body;

    try {
      // Check if a customer with the provided email exists
      const reviewTag = await vehicleTags.findOne({tagId });

      if (reviewTag) {
        // Update the password
        if(link!='undefined' && link!=''){
        reviewTag.link = link;}
        await reviewTag.save();

        return res.status(200).json({ status: true,data:reviewTag, message: 'Link updated successfully' });
      } else {
        return res.status(404).json({ status: false, message: 'Tag not found' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/deleteReviewTag',upload.single(''), async (req, res) => {
  const { tagId } = req.body;

  try {
    // Check if a reviewTag with the provided tagId exists
    const reviewTag = await vehicleTags.deleteOne({ tagId });

    if (reviewTag) {
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
router.post('/deleteReviewTagLink',upload.single(''), async (req, res) => {
  const { _id } = req.body;

  try {
    // Check if a reviewTag with the provided tagId exists
    const reviewTag = await vehicleTagLinks.deleteOne({ _id });

    if (reviewTag) {
      // Delete the reviewTag

       console.log("True")
      return res.status(200).json({ status: true, message: 'ReviewTag deleted successfully' });
    } else {
      return res.status(404).json({ status: false, message: 'ReviewTag not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports= router;

