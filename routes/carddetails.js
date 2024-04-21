const express = require("express");
const router = express.Router();
const CardDetails = require("./Schemas/cardDetailsSchema");
const Invite = require("./Schemas/inviteSchema");

var upload = require("./multer");
const uuid = require("uuid");
var pool = require("./pool");
const fs=require('fs');







router.post("/addcardDetails", upload.single(""), async (req, res) => {
  try {
    const { customerId, companyname, paymentStatus, cardStatus, createdDate, companyId,cardViewCount } = req.body;

    // Check if companyId already exists in the databas
    const newCardDetails = new CardDetails({
      customerId,
      companyname,
      paymentStatus,
      cardStatus,
      createdDate,
cardViewCount,
      companyId: companyId,
      cardImage: req.file,
    });

    const savedCardDetails = await newCardDetails.save();

    return res.status(200).json({ status: true, data: savedCardDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create cardDetails document" });
  }
});

router.post("/addInvite", upload.any(), async (req, res) => {
  try {
    const {inviteId} = req.body;
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
   

     const invite= await Invite.findOne({inviteId})
    
     if(invite){
	if(coverVideo!=""){
	invite.coverVideo=coverVideo}
        if(invitationVideo!=""){
        invite.invitationVideo=invitationVideo
}	
 const savedCardDetails = await invite.save();

    return res.status(200).json({ status: true, data:savedCardDetails });

	
	
		}else{
 const newCardDetails = new Invite({
       companyId:companyId,
       coverVideo:coverVideo,
       invitationVideo:invitationVideo
    });

    const savedCardDetails = await newCardDetails.save();

    return res.status(200).json({ status: true, data: savedCardDetails });
}
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create cardDetails document" });
  }
});

router.post("/fetchInvite", upload.any(), async (req, res) => {
  try {
    const { companyId} = req.body;


     const invite= await Invite.findOne({companyId:companyId})
    
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


router.post("/verifyCompanyName",upload.single(""),async(req,res)=>{
const  {companyId}=req.body;
console.log(req.body);
try{
let uniqueCompanyId = companyId.split(' ').join('');
const existingCard = await CardDetails.findOne({ companyId:uniqueCompanyId });
if(existingCard){

return res.status(200).json({status:true,message:"Already Registered"});

}else{
  return res.status(200).json({status:false,message:"Available"});
}
}catch(err){
console.log(err);
return res.status(500).json({message:"server Error"});
}
});


router.post("/updateCardStatus",upload.single(""),async(req,res)=>{
const  {_id,cardStatus}=req.body;
console.log(req.body);
try{
const card = await CardDetails.findOne({_id})
if(card){
card.cardStatus=cardStatus;
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

router.post("/updateViewCount", upload.single(""), async (req, res) => {
  const { _id, cardViewCount } = req.body;
  console.log(req.body);

  try {
    // Check if a customer with the provided email exists
    const card = await CardDetails.findOne({ _id });

    if (card) {
      // Update the password
      card.cardViewCount = cardViewCount;
      await card.save();

      return res
        .status(200)
        .json({ status: true, message: "Company Name updated successfully" });
    } else {
      return res.status(404).json({ status: false, message: "not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updateProfile",upload.single(""),async (req,res)=>{

const {_id,profile}=req.body;
try{
const card= await CardDetails.findOne({_id})
if(card){
card.profile = profile;
await card.save();

return res.status(200).json({status:true,message:"updated"});


}else{
return res.status(404).json({status:false,message:"Not found"});
}

}catch{
return res.status(500).json({message:'error'})

}

})


router.post("/updateEnquiry",upload.single(""),async (req,res)=>{

const {_id,enquiry}=req.body;
try{
const card= await CardDetails.findOne({_id})
if(card){
card.enquiry = enquiry;
await card.save();

return res.status(200).json({status:true,message:"updated"});


}else{
return res.status(404).json({status:false,message:"Not found"});
}

}catch{
return res.status(500).json({message:'error'})

}

})


router.post("/updateWhatsappClickCount", upload.single(""), async (req, res) => {
  const { _id, whatsappClickCount } = req.body;
  console.log(req.body);

  try {
    // Check if a customer with the provided email exists
    const card = await CardDetails.findOne({ _id });

    if (card) {
      // Update the password
      card.whatsappClickCount = whatsappClickCount;
      await card.save();

      return res
        .status(200)
        .json({ status: true, message: "Company Name updated successfully" });
    } else {
      return res.status(404).json({ status: false, message: "not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});



router.post("/updateInstaClickCount", upload.single(""), async (req, res) => {
  const { _id, instaClickCount } = req.body;
  console.log(req.body);

  try {
    // Check if a customer with the provided email exists
    const card = await CardDetails.findOne({ _id });

    if (card) {
      // Update the password
      card.instaClickCount = instaClickCount;
      await card.save();

      return res
        .status(200)
        .json({ status: true, message: "Company Name updated successfully" });
    } else {
      return res.status(404).json({ status: false, message: "not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/updatemenu", upload.single(""), async (req, res) => {
  const { _id, menuLink } = req.body;
  console.log(req.body);

  try {
    // Check if a customer with the provided email exists
    const card = await CardDetails.findOne({ _id });

    if (card) {
      // Update the password
      card.menuLink = menuLink;
      await card.save();

      return res
        .status(200)
        .json({ status: true, message: "Company Name updated successfully" });
    } else {
      return res.status(404).json({ status: false, message: "not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/updateFbClickCount", upload.single(""), async (req, res) => {
  const { _id, fbClickCount } = req.body;
  console.log(req.body);

  try {
    // Check if a customer with the provided email exists
    const card = await CardDetails.findOne({ _id });

    if (card) {
      // Update the password
      card.fbClickCount = fbClickCount;
      await card.save();

      return res
        .status(200)
        .json({ status: true, message: "Company Name updated successfully" });
    } else {
      return res.status(404).json({ status: false, message: "not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updateLinkdinClickCount", upload.single(""), async (req, res) => {
  const { _id, linkdinClickCount } = req.body;
  console.log(req.body);

  try {
    // Check if a customer with the provided email exists
    const card = await CardDetails.findOne({ _id });

    if (card) {
      // Update the password
      card.linkdinClickCount = linkdinClickCount;
      await card.save();

      return res
        .status(200)
        .json({ status: true, message: "Company Name updated successfully" });
    } else {
      return res.status(404).json({ status: false, message: "not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});




router.post("/updateContactDownloadCount", upload.single(""), async (req, res) => {
  const { _id, contactDownloadCount } = req.body;
  console.log(req.body);

  try {
    // Check if a customer with the provided email exists
    const card = await CardDetails.findOne({ _id });

    if (card) {
      // Update the password
      card.contactDownloadCount = contactDownloadCount;
      await card.save();

      return res
        .status(200)
        .json({ status: true, message: "Company Name updated successfully" });
    } else {
      return res.status(404).json({ status: false, message: "not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updateCompanyName", upload.single(""), async (req, res) => {
  const { _id, companyname } = req.body;

  try {
    // Check if a customer with the provided email exists
    const card = await CardDetails.findOne({ _id });

    if (card) {
      // Update the password
      if(companyname!='undefined'){
      card.companyname = companyname;
	card.companyId = companyname;
      await card.save();}

      return res
        .status(200)
        .json({ status: true, message: "Theme updated successfully",data:card });
    } else {
      return res.status(404).json({ status: false, message: "not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/updateCardDesign",upload.any(),async(req,res)=>{
	
	console.log(req.body);
	console.log(req.files);
	const {_id,designId}=req.body;
	let cardFront="";
	let cardBack="";
	

	if(req.files.length!=0)
	{ req.files.map((item)=>{
	if(item.fieldname=='cardFront')
	{
	cardFront=item.originalname;	
	}
	if(item.fieldname=='cardBack')
	{	
	cardBack=item.originalname;
	}
});
}

try{
const card = await CardDetails.findOne({ _id });

	if(card){
	if(designId!='undefined'){
	card.designId=designId;
}
	if(req.files.length!=0)
	{
	if(cardFront!='')
	{
	card.cardFront=cardFront;
	}
	if(cardBack!='')
	{
	card.cardBack=cardBack;
	}
	}
	await card.save();
	
	return res.status(200).json({status:true,data:card});
}else{
	return res.status(404).json({status:false,message:'not found'});
}
}
catch(err){
	console.log(err);
	return res.status(500).json({message:"Server"});
	}





});

router.post(
  "/updatepersonelinfo",
  upload.any(),
  async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const {
      _id,
      fullname,
      position,
      phoneNumber,
      AlternatePhoneNumber,
      whatsappNo,
      Address,
      Email,
      website,
      location,
      AboutUs,
      fbLink,
      igLink,
      TwitterLink,
      YoutubeLink,
      PinterestLink,
      LinkdnLink,
      threads,
      education,
      hobby,
      skype,
      zomato,
      discord,
      dribble,
      behance,
      playstore,
      appstore,
      paytmNumber,
      Googlepaynumber,
      phonepenumber
    } = req.body;
    console.log(req.body)
    let companylogo;
    let type2;
    let coverVideo ="";
    let companyCoverImage;
   let type;  
  if(req.files.length!=0)
    {
      req.files.map((item)=>{
        if(item.fieldname=='companylogo')
        {
        companylogo =fs.readFileSync(item.path);
        type2=item.mimetype
        }
        if(item.fieldname=='companyCover')
        {
          companyCoverImage=fs.readFileSync(item.path);
          type=item.mimetype
          
          
        }
        if(item.fieldname=='coverVideo')
        {
          coverVideo=item.filename
        
        }
      })
     console.log(companyCoverImage!=null)
    }
    try {
      // Check if a customer with the provided email exists
      const card = await CardDetails.findOne({ _id });

      if (card) {
        if(fullname!='undefined'){
        card.fullname = fullname;}
        if(position!='undefined'){
        card.position = position;}
        if(phoneNumber!='undefined'){
        card.phoneNumber = phoneNumber;}
        if(AlternatePhoneNumber!='undefined' &&  AlternatePhoneNumber!='null'){
        card.AlternatePhoneNumber = AlternatePhoneNumber;}
        if(whatsappNo!='undefined'){
        card.WhatsappNo = whatsappNo;}
        if(Address!='undefined'){
        card.Address = Address;}
        if(Email!='undefined'){
        card.Email = Email;}
        if(website!='undefined'){
        card.website = website;}
        if(location!='undefined'){
        card.location = location;}
        if(AboutUs!='undefined'){
        card.AboutUs = AboutUs;}
         if(fbLink!='undefined'){
        card.fbLink = fbLink; }
        if(igLink!='undefined'){
        card.igLink = igLink; }
        if(TwitterLink!='undefined'){
        card.TwitterLink = TwitterLink;}
        if(YoutubeLink!='undefined'){
        card.YoutubeLink = YoutubeLink;}
        if(PinterestLink!='undefined'){
        card.PinterestLink = PinterestLink;}
        if(LinkdnLink!='undefined'){
        card.LinkdnLink = LinkdnLink;}
        if(threads!='undefined'){
        card.threads = threads; }
        if(education!='undefined'){
        card.education = education; }
        if(hobby!='undefined'){
        card.hobby = hobby;}
        if(skype!='undefined'){
        card.skype = skype;}
        if(zomato!='undefined'){
        card.zomato = zomato;}
        if(discord!='undefined'){
        card.discord = discord;}
         if(dribble!='undefined'){
        card.dribble = dribble; }
        if(behance!='undefined'){
        card.behance = behance; }
        if(playstore!='undefined'){
        card.playstore = playstore;}
        if(appstore!='undefined'){
        card.appstore = appstore}
         if(paytmNumber!='undefined'){
        card.paytmNumber = paytmNumber;}
        if(Googlepaynumber!='undefined'){
        card.Googlepaynumber = Googlepaynumber;}
        if(phonepenumber!='undefined'){
        card.phonepenumber = phonepenumber;}
        console.log(companylogo)
        if(req.files.length!=0)
        {
          if(companylogo!='' && companylogo!=undefined){
            card.companylogo.data=companylogo;
            card.companylogo.contentType=type2;
          }

          if(companyCoverImage!=null){
            console.log('bfb')
            card.companyCoverImage.data=companyCoverImage;
           card.companyCoverImage.contentType=type;
           card.coverVideo = coverVideo;}
            
            if(coverVideo!=''){
          
              card.coverVideo = coverVideo;
          }  
          }
         
        await card.save();
        // console.log(card);

        return res
          .status(200)
          .json({
            status: true,
            data: card,
            message: "Personel Info updated successfully",
          });
      } else {
        return res.status(404).json({ status: false, message: "not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);


router.post(
  "/updatesociallinks",
  upload.single("companylogo"),
  async (req, res) => {
    console.log(req.body.links);
    
    const {
      _id,
      fbLink,
      igLink,
      TwitterLink,
      YoutubeLink,
      PinterestLink,
      LinkdnLink,
      YoutubeVideoLink1,
      YoutubeVideoLink2,
      YoutubeVideoLink3,
      YoutubeVideoLink4,
      YoutubeVideoLink5,
 YoutubeVideoLink6,
 YoutubeVideoLink7,
 YoutubeVideoLink8,
 YoutubeVideoLink9,
 YoutubeVideoLink10,
      GoogleMapLink,
      menuLink,
      website,
      location,
      links
    } = req.body;
   
    try {
      // Check if a customer with the provided email exists
      const card = await CardDetails.findOne({ _id });

      if (card) {
        // Update the password
        if(fbLink!='undefined'){
        card.fbLink = fbLink; }
        if(igLink!='undefined'){
        card.igLink = igLink; }
        if(TwitterLink!='undefined'){
        card.TwitterLink = TwitterLink;}
        if(YoutubeLink!='undefined'){
        card.YoutubeLink = YoutubeLink;}
        if(PinterestLink!='undefined'){
        card.PinterestLink = PinterestLink;}
        if(LinkdnLink!='undefined'){
        card.LinkdnLink = LinkdnLink;}
        if(YoutubeVideoLink1!='undefined'){
        card.YoutubeVideoLink1 = YoutubeVideoLink1;}
        if(YoutubeVideoLink2!='undefined'){
        card.YoutubeVideoLink2 = YoutubeVideoLink2;}
        if(YoutubeVideoLink3!='undefined'){
        card.YoutubeVideoLink3 = YoutubeVideoLink3;}
        if(YoutubeVideoLink4!='undefined'){
        card.YoutubeVideoLink4 = YoutubeVideoLink4;}
        if(YoutubeVideoLink5!='undefined'){
        card.YoutubeVideoLink5 = YoutubeVideoLink5;}
 if(YoutubeVideoLink6!='undefined'){
        card.YoutubeVideoLink6 = YoutubeVideoLink6;}
 if(YoutubeVideoLink7!='undefined'){
        card.YoutubeVideoLink7 = YoutubeVideoLink7;}
 if(YoutubeVideoLink8!='undefined'){
        card.YoutubeVideoLink8 = YoutubeVideoLink8;}
 if(YoutubeVideoLink9!='undefined'){
        card.YoutubeVideoLink9 = YoutubeVideoLink9;}
 if(YoutubeVideoLink10!='undefined'){
        card.YoutubeVideoLink10 = YoutubeVideoLink10;}
        
if(GoogleMapLink!='undefined'){
        card.GoogleMapLink = GoogleMapLink;}
        if(menuLink!='undefined'){
        card.menuLink = menuLink;}
	 if(website!='undefined'){
        card.website = website;}
	 if(location!='undefined'){
        card.location = location;}
	 if(links!=[]){
        card.links = JSON.parse(links);}

        await card.save();
        console.log(card);

        return res
          .status(200)
          .json({
            status: true,
            data: card,
            message: "Personel Info updated successfully",
          });
      } else {
        return res.status(404).json({ status: false, message: "not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);


router.post(
  "/updatepaymentstatus",
  upload.single(""),
  async (req, res) => {
    console.log(req.body);
    
    const {
      _id,
      paymentStatus,
      createdDate,
      packageAmount
    } = req.body;
   
    try {
      // Check if a customer with the provided email exists
      const card = await CardDetails.findOne({ _id });

      if (card) {
        // Update the paymentstatus
        if(paymentStatus!='undefined'){
        card.paymentStatus = paymentStatus; }
if(packageAmount!='undefined')        
{card.packageAmount=packageAmount;}
     if(createdDate!='undefined'){
card.createdDate=createdDate} 
        await card.save();
        console.log(card);

        return res
          .status(200)
          .json({
            status: true,
            data: card,
            message: "Personel Info updated successfully",
          });
      } else {
        return res.status(404).json({ status: false, message: "not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/updatehotels", upload.any(),async (req, res) => {
  const { _id,hotelName1,hotelName2,hotelName3,hotelName4,hotelLink1,hotelLink2,hotelLink3,hotelLink4}=req.body;

  try {
    // Check if a customer with the provided _id exists
    const card = await CardDetails.findOne({ _id });

    if (card) {
       if(hotelName1!='undefined' && hotelLink1!='undefined'){
	   card.hotelName1=hotelName1;
	   card.hotelLink1=hotelLink1;
		}
	 if(hotelName2!='undefined' && hotelLink2!='undefined'){
           card.hotelName2=hotelName2;
           card.hotelLink2=hotelLink2;
                }
	
	 if(hotelName3!='undefined' && hotelLink3!='undefined'){
           card.hotelName3=hotelName3;
           card.hotelLink3=hotelLink3;
                }       
	 if(hotelName4!='undefined' && hotelLink4!='undefined'){
           card.hotelName4=hotelName4;
           card.hotelLink4=hotelLink4;
                }
               await card.save();
      return res.status(200).json({
        status: true,
        data: card,
        message: "Products updated successfully",
      });
    } else {
      return res.status(404).json({ status: false, message: "Card not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});



router.post(
  "/updatepayment",
  upload.any(),
  async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const {
      _id,
      paytmNumber,
      Googlepaynumber,
      phonepenumber,
      bankname,
      Accountholdername,
      bankaccountnumber,
      bankifsccode,
      gst,
    } = req.body;
    let paytmQrimage = "";
    let googlepayQrimage = "";
    let phonepeQrimage = "";
    console.log(req.files[1])
    console.log(req.files)
   if(req.files.length!=0)
  {
    req.files.map((item)=>{
      console.log('asdfghj',item.fieldname)
     if(item.fieldname=="paytmQrimage"){
      
      paytmQrimage = item.originalname;}
      if(item.fieldname=="googlepayQrimage"){
      googlepayQrimage = item.originalname;}
      if(item.fieldname=="phonepeQrimage"){
      phonepeQrimage = item.originalname;}
    })
  }
    try {
      // Check if a customer with the provided email exists
      const card = await CardDetails.findOne({ _id });

      if (card) {
        // Update the password
        if(paytmNumber!='undefined'){
        card.paytmNumber = paytmNumber;}
        if(Googlepaynumber!='undefined'){
        card.Googlepaynumber = Googlepaynumber;}
        if(phonepenumber!='undefined'){
        card.phonepenumber = phonepenumber;}
        if(bankname!='undefined'){
        card.bankname = bankname;}
        if(Accountholdername!='undefined'){
        card.Accountholdername = Accountholdername;}
        if(bankaccountnumber!='undefined'){
        card.bankaccountnumber = bankaccountnumber;}
        if(bankifsccode!='undefined'){
        card.bankifsccode = bankifsccode;}
        if(gst!='undefined'){
        card.gst = gst}
        if (req.files.length != 0) {
          if(paytmQrimage!="")
          {
          card.paytmQrimage = paytmQrimage;
          }
          if(phonepeQrimage!="")
          {
          card.phonepeQrimage = phonepeQrimage;
          }
          if(googlepayQrimage!="")
          {
          card.googlepayQrimage = googlepayQrimage;
          }
        }
        await card.save();
        console.log(card);

        return res
          .status(200)
          .json({
            status: true,
            data: card,
            message: "Payment Info updated successfully",
          });
      } else {
        return res.status(404).json({ status: false, message: "not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);


router.post("/updateproduct", upload.any(),async (req, res) => {
  const { _id } = req.body;
  const products=JSON.parse(req.body.productName)
console.log('list',req.body.productName)
  try {
    // Check if a customer with the provided _id exists
    const card = await CardDetails.findOne({ _id });

    if (card) {

      card.products=products
      console.log('first',card.products)
      
      products.map((item)=>{
	if(item!=null){
        req.files.map((img,index2)=>{

          
  if(item.index==img.fieldname.slice(-1))
  {    if(img!=null){
            card.products[img.fieldname.slice(-1)].productimage=img.originalname
  }
          }

        })
}
      })

      
      console.log('third',card.products)
      await card.save();
     
      

      return res.status(200).json({
        status: true,
        data: card,
        message: "Products updated successfully",
      });
    } else {
      return res.status(404).json({ status: false, message: "Card not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});





router.post('/deleteproduct', upload.single(''),async (req, res) => {
  const { cardId, productId } = req.body;
  console.log(req.body)

  try {
    // Find the card by cardId in the database
    const card = await CardDetails.findById(cardId);
      console.log(card);
    // If the card doesn't exist, return an error response
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    console.log(card.products);

    // Find the product by productId in the card's product array
    const productIndex = card.products.findIndex((product) =>product._id.toString() === productId);
    // If the product doesn't exist, return an error response
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Remove the product from the card's product array
    card.products.splice(productIndex, 1);

    // Save the updated card in the database
    await card.save();

    // Return a success response
    return res.json({ status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/updateecommer", upload.any(), async (req, res) => {
    const { _id } = req.body;
    const products = JSON.parse(req.body.products);

    try {
        // Check if a card with the provided _id exists
        const card = await CardDetails.findOne({ _id });

        if (!card) {
            return res.status(404).json({ status: false, message: "Card not found" });
        }

        card.ecommerce = products;

        products.forEach((item) => {
            if (item !== null) {
                for (let i = 0; i < 4; i++) {
                    const imgFieldName = `productimg${i}`;
                    if (item[imgFieldName]) {
                        console.log(`Updating ${imgFieldName} for product ${item.index}`);
                        card.ecommerce[item.index][imgFieldName] = item[imgFieldName].originalname;
                    }
                }
            }
        });

        console.log('Updated Ecommerce:', card.ecommerce);

        await card.save();

        return res.status(200).json({
            status: true,
            data: card,
            message: "Products updated successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});



router.post("/updateecommerce", upload.any(),async (req, res) => {
  const { _id } = req.body;
  const products=JSON.parse(req.body.products)
console.log('list',req.body.productName)
  try {
    // Check if a customer with the provided _id exists
    const card = await CardDetails.findOne({ _id });

    if (card) {

      card.ecommerce=products
      console.log('first',card.ecommerce)
      
      products.map((item)=>{
	if(item!=null){
        req.files.map((img,index2)=>{

          
  if(item.index==img.fieldname.slice(-1))
  {	
	if(img!=null){
            card.ecommerce[img.fieldname.slice(-1)].productimg=img.originalname
  }
          }

        })
}
      })

      
      console.log('third',card.ecommerce)
      await card.save();
     
      

      return res.status(200).json({
        status: true,
        data: card,
        message: "Products updated successfully",
      });
    } else {
      return res.status(404).json({ status: false, message: "Card not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/deleteecommerceproduct', upload.single(''),async (req, res) => {
  const { cardId, productId } = req.body;
  console.log(req.body)

  try {
    // Find the card by cardId in the database
    const card = await CardDetails.findById(cardId);

    // If the card doesn't exist, return an error response
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Find the product by productId in the card's product array
    const productIndex = card.ecommerce.findIndex((product) =>product._id.toString() === productId);

    // If the product doesn't exist, return an error response
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Remove the product from the card's product array
    card.ecommerce.splice(productIndex, 1);

    // Save the updated card in the database
    await card.save();

    // Return a success response
    return res.json({ status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/showUpdate', upload.single(''),async (req, res) => {
  const { cardId, productId,show } = req.body;
  console.log(req.body)

  try {
    // Find the card by cardId in the database
    const card = await CardDetails.findById(cardId);

    // If the card doesn't exist, return an error response
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Find the product by productId in the card's product array
    const productIndex = card.ecommerce.findIndex((product) =>product._id.toString() === productId);

    
    card.ecommerce[productIndex].show = show;

    // Save the updated card in the database
    await card.save();
    // Return a success response
    return res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



router.post("/updategallery", upload.any(),async (req, res) => {
  const { _id } = req.body;
  const gallery=JSON.parse(req.body.gallery)
console.log('list',req.files)
  try {
    // Check if a customer with the provided _id exists
    const card = await CardDetails.findOne({ _id });

    if (card) {

      card.gallery=gallery
      console.log('first',card.gallery)
      
      gallery.map((item)=>{
	if(item!=null){   
     req.files.map((img,index2)=>{

          
  if(item.index==img.fieldname.slice(-1))
  {	if(img!=null){
            card.gallery[img.fieldname.slice(-1)].image=img.originalname
  }
          }

        })
}      
})

      
      console.log('third',card.gallery)
      await card.save();
     
      

      return res.status(200).json({
        status: true,
        data: card,
        message: "Products updated successfully",
      });
    } else {
      return res.status(404).json({ status: false, message: "Card not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/deletegallery', upload.single(''),async (req, res) => {
  const { cardId, galleryId } = req.body;
  console.log(req.body)

  try {
    // Find the card by cardId in the database
    const card = await CardDetails.findById(cardId)

    // If the card doesn't exist, return an error response
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Find the product by productId in the card's product array
    const productIndex = card.gallery.findIndex((product) => product._id.toString() === galleryId);

    // If the product doesn't exist, return an error response
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Remove the product from the card's product array
    card.gallery.splice(productIndex, 1);

    // Save the updated card in the database
    await card.save();

    // Return a success response
    return res.json({ status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



router.post("/updateCardTheme", upload.single(""), async (req, res) => {
  const { _id, themeid } = req.body;
  console.log(req.body);

  try {
    // Check if a customer with the provided email exists
    const card = await CardDetails.findOne({ _id });

    if (card) {
      // Update the password
      card.themeid = themeid;
      await card.save();

      return res
        .status(200)
        .json({ status: true, message: "Company Name updated successfully" });
    } else {
      return res.status(404).json({ status: false, message: "not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/getcardDetails", upload.single(""), async (req, res) => {
  try {
    const { customerId } = req.body;

    const cardDetails = await CardDetails.findOne({ customerId });

    if (!cardDetails) {
      return res.status(404).json({ error: "Card details not found" });
    }
    return res.status(200).json({ status: true, data: cardDetails });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve card details" });
  }
});
router.get('/displayallcards', async (req, res) => {
    try {
      const cards = await CardDetails.find()
      return  res.status(200).json(cards)
    } catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    }
  });
router.post("/getcardDetailsbycompanyid", upload.single(""), async (req, res) => {
  try {
    const { companyId } = req.body;
    console.log(req.body.companyId)

    const cardDetails = await CardDetails.findOne({ companyId });

    if (!cardDetails) {
      return res.status(404).json({ error: "Card details not found" });
    }
    console.log(cardDetails);
    return res.status(200).json({ status: true, data: cardDetails });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Failed to retrieve card details" });
  }
});

module.exports = router;
