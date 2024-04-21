var express = require('express');
var router = express.Router();
var addMenuSchema=require('./Schemas/addMenuModal')
var menuOrderSchema=require('./Schemas/orderModal')
var restaurantDetailsSchema=require('./Schemas/restaurantDetailsSchema')
var upload=require('./multer')
/* GET home page. */
router.post('/addmenu',upload.any(),async(req,res)=>{
  console.log(req.body)
 const {menuId,dish,price,Halfprice,rating,sorting,stock,description,foodtype}=req.body
  const form=new addMenuSchema({menuId:menuId,dish:dish,price:price,Halfprice:Halfprice,rating:rating,sorting:sorting,stock:stock,description:description,foodtype:foodtype,Image:req.files[0].originalname})
  await form.save();

  return res.status(200).json({status:true,id:form._id})
});
router.post('/MenuOrder',upload.any(),async(req,res)=>{
  console.log(req.body)
 const {menuId,name,phone,message,table,Number,totalPrice,dishes}=req.body
  const form=new menuOrderSchema({menuId:menuId,name:name,phone:phone,message:message,table:table,Number:Number,totalPrice:totalPrice,dishes:dishes})
  await form.save();

  return res.status(200).json({status:true,data:form})
});

router.post('/chkTagId', upload.single(), async (req, res) => {
    let {menuId} = req.body;
    console.log(req.body);
    try {
      let Restaurant = await restaurantDetailsSchema.findOne({ menuId });

      if (!Restaurant){
        return res.status(200).json({ status: 'false', message: 'Not Found' });
      } else {

     return res.status(200).json({      status: 'true',data:Restaurant,  message: 'Found', });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/getTagsByPhone',upload.single(''),async(req,res)=>{

  try{
        const {phone}=req.body;
        const tags=await restaurantDetailsSchema.findOne({phone});
        if(!tags){
        return res.status(404).json({error:"Not Found"});

        }
        return res.status(200).json({status:true,data:tags});
        }catch(error){
	console.log(error)
	        return res.status(500).json({error:"error"});
        }

});

router.post('/customerLogin', upload.single(), async (req, res) => {
  let { menuId,  phone } = req.body;

  try {

    const customer = new restaurantDetailsSchema({
      menuId: menuId,
      phone: phone,
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

router.post('/search',upload.any(''), async (req, res) => {
  try {
    const { menuId, keywords } = req.body;

    // Assuming you have a company ID field in your addMenuSchema
    const companyData = await addMenuSchema.findOne({ menuId });

    if (!companyData) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const foodData = await addMenuSchema.find({
      companyId,
      $or: [
        { dish: { $regex: keywords, $options: 'i' } },
        { description: { $regex: keywords, $options: 'i' } },
        { foodtype: { $regex: keywords, $options: 'i' } },
      ]
    });

    return res.status(200).json({ data: foodData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});



router.post('/updatemenuorder',upload.any(""),async(req,res)=>{
  console.log(req.body)
  console.log(req.file)
 const {_id,name,phone,message,totalPrice,dishes}=req.body

try{
  const form=await menuOrderSchema.findOne({_id:_id})
if(form){
     form.name=name;
	form.phone=phone;
	form.message=message;
	form.totalPrice=totalPrice;
	form.dishes=dishes;
await form.save()
        return res.status(200).json({status:true,data:form})

        }else{
         return res.status(404).json({status:false})

        }
} catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({status:false, message: 'Internal Server Error' });
  }

});


router.post('/updateWaiterCalled',upload.any(""),async(req,res)=>{
  console.log(req.body)
  console.log(req.file)
 const {_id,waiterCalled}=req.body

try{
  const form=await menuOrderSchema.findOne({_id:_id})
if(form){
        form.waiterCalled=waiterCalled;
await form.save()
        return res.status(200).json({status:true,data:form})

        }else{
         return res.status(404).json({status:false})

        }
} catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({status:false, message: 'Internal Server Error' });
  }

});



router.post('/addRestaurantDetails',upload.single("logo"),async(req,res)=>{
  console.log(req.body)
  console.log(req.file)
 const {menuId,restaurantName,number}=req.body
try{
  const form=await restaurantDetailsSchema.findOne({menuId:menuId})
    console.log(form)
     form.restaurantName=restaurantName;
     form.number=number;
     if(req.file!=undefined){     
     form.logo=req.file.originalname     
}
await form.save()
	return res.status(200).json({status:true,id:form._id})	

	
} catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({status:false, message: 'Internal Server Error' });
  }

});


router.post('/call',upload.any(""),async(req,res)=>{
  console.log(req.body)
  console.log(req.file)
 const {menuId,call}=req.body
try{
  const form=await restaurantDetailsSchema.findOne({menuId:menuId})
if(form){
     form.call=call;
await form.save()
        return res.status(200).json({status:true,id:form._id})

        }else{
	 return res.status(404).json({status:false})

	}
} catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({status:false, message: 'Internal Server Error' });
  }

});


router.post('/getRestaurantDetails',upload.single("logo"),async(req,res)=>{
  console.log(req.body)
 const {menuId}=req.body
try{
  const form=await restaurantDetailsSchema.findOne({menuId:menuId})
if(form){
  return res.status(200).json({status:true,data:form})
    } else {
      return res.status(404).json({status:false, message: 'Menu order not found' });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({status:false, message: 'Internal Server Error' });
  }

});




router.post('/editmenu',upload.any(),async(req,res)=>{
   const { _id,dish,price,Halfprice,rating,sorting,stock,description,foodtype } = req.body;
  console.log(req.body)

  try {
    const edit = await addMenuSchema.findOne({_id})
    if (edit) {
         edit.dish=dish;
         edit.price=price;
         edit.Halfprice=Halfprice;
	 edit.rating=rating;
	 edit.sorting=sorting;
	 edit.stock=stock;
	 edit.description=description;
	 edit.foodtype=foodtype;
    await edit.save()


      return res.status(200).json({ status:true,message: 'Status updated successfully'});
    } else {
      return res.status(404).json({status:false, message: 'Menu order not found' });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({status:false, message: 'Internal Server Error' });
  }
});

router.post('/editImage',upload.any(),async(req,res)=>{
   const { _id } = req.body;
  console.log(req.body)

  try {
    const edit = await addMenuSchema.findOne({_id})
    if (edit) {
         edit.Image=req.files[0].originalname;
    await edit.save()


      return res.status(200).json({ status:true,message: 'Status updated successfully'});
    } else {
      return res.status(404).json({status:false, message: 'Menu order not found' });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({status:false, message: 'Internal Server Error' });
  }
});


router.post('/getDataById',upload.any(),async(req,res)=>{
   const {menuId}=req.body  
try{
    const data=await addMenuSchema.find({menuId:menuId});
    console.log(data)
    return res.status(200).json({data:data})

  }catch (error){
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/delete',upload.any(),async(req,res)=>{
   const {_id}=req.body
try{
    const data=await addMenuSchema.deleteOne({_id:_id});
    console.log(data)
    return res.status(200).json({status:true,data:data})

  }catch (error){
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/menudata',upload.any(),async(req,res)=>{
 const {menuId}=req.body  
try{
    const data=await menuOrderSchema.find({menuId:menuId});
    console.log(data)
    return res.status(200).json({data:data})

  }catch (error){
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

 

module.exports = router;

