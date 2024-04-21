const express = require("express");
const router = express.Router();
const Invite = require("./Schemas/inviteSchema");

var upload = require("./multer");
const uuid = require("uuid");
var pool = require("./pool");
const fs=require('fs');


router.post('/getTagsByPhone',upload.single(''),async(req,res)=>{

  try{
	const {phone}=req.body;
	const tags=await Invite.findOne({phone});
	
	if(!tags){
	return res.status(404).json({error:"Not Found"});
	
	}
	return res.status(200).json({status:true,data:tags});
	}catch(error){
	return res.status(500).json({error:"error"});
	}

});


router.post("/fetchInvite", upload.any(), async (req, res) => {
  try {
    const {inviteId} = req.body;


     const invite= await Invite.findOne({inviteId:inviteId})
    
     console.log(invite)
if(invite){
    return res.status(200).json({ status: true, data:invite });
 }else{
 return res.status(404).json({ status: false });

}  
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create cardDetails document" });
  }
});


router.post('/customerLogin', upload.single(), async (req, res) => {
  let { inviteId,  phone } = req.body;

  try {
    const customer = new Invite({
      inviteId: inviteId,
      phone: phone,
	 });

    await customer.save();
    return res
      .status(200)
      .json({ status: 'true', data: customer, message: 'Login successful' });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/displayalltags', async (req, res) => {
    try {
      const cards = await Invite.find();
      return  res.status(200).json(cards)
    } catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    }
  });

router.post('/chkInviteId', upload.single(), async (req, res) => {
    let {inviteId} = req.body;
    console.log(req.body);
    try {
      let Invites = await Invite.findOne({ inviteId });
  
      if (!Invites){
        return res.status(200).json({ status: 'false', message: 'Not Found' });
      } else {
       
     return res.status(200).json({status: 'true',data:Invites,  message: 'Found', });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


router.post("/addInvite", upload.any(), async (req, res) => {
  try {
    const { inviteId} = req.body;
    console.log(req.body)
    console.log(req.files)
    let coverVideo=""
    let invitationVideo=""
    req.files.map((item)=>{
	  if(item.fieldname=="coverVideo"){
		coverVideo=item.originalname
			}
	 if(item.fieldname=="invitationVideo"){
                invitationVideo=item.originalname
                        }

		})
                   // Check if companyId already exists in the databas
   

     const invite= await Invite.findOne({inviteId:inviteId})
    
     if(invite){
	if(coverVideo!=""){
	invite.coverVideo=coverVideo}
        if(invitationVideo!=""){
        invite.invitationVideo=invitationVideo
}	
 const savedCardDetails = await invite.save();

    return res.status(200).json({ status: true, data:savedCardDetails });

    }else{
 
    return res.status(404).json({ status: false });
}
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create cardDetails document" });
  }
});

module.exports = router;
