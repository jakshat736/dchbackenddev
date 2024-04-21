const express = require("express");
const router = express.Router();
const product = require("./Schemas/productSchema");
var upload = require("./multer");
const uuid = require("uuid");
var pool = require("./pool");
const fs=require('fs');

router.post("/addProduct", upload.any(), async (req, res) => {
  const { categoryName,subCategoryName,productName,price,offerprice,description,uploadName,uploadLogo,uploadDescription,uploadLink,customizable,description1,description2,description3,description4,hotSelling,newArrival } = req.body;
  let images=[]

  req.files.map((item,index)=>{
       images[index]=item.filename
  })

  try {
      const newProduct = new product({
      categoryName,
      subCategoryName,
      productName,
      price,
offerprice,
description,
uploadName,uploadLogo,uploadDescription,uploadLink,customizable,
description1,description2,description3,description4,hotSelling,
newArrival,
      images, // Use the images array directly
    });

    const products = await newProduct.save();

    return res.status(200).json({ status: true, data:products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});



router.post("/editProduct", upload.any(), async (req, res) => {
  const { _id,categoryName,subCategoryName,productName,price,offerprice,description,uploadName,uploadLogo,uploadDescription,uploadLink,customizable,description1,description2,description3,description4,hotSelling,newArrival } = req.body;
  
  try {
      const product1 = await product.findOne({"_id":_id});
      if(product1){
	product1.categoryName=categoryName;
        product1.subCategoryName=subCategoryName;
        product1.productName=productName;
        product1.price=price;
        product1.offerprice=offerprice;
        product1.description=description;
	product1.uploadName=uploadName;
	 product1.uploadLogo=uploadLogo;
	 product1.uploadDescription=uploadDescription;
	 product1.uploadLink=uploadLink;
	product1.customizable=customizable
        product1.description1=description1;
        product1.description2=description2;
        product1.description3=description3;
        product1.description4=description4;
	product1.hotSelling=hotSelling; 
        product1.newArrival=newArrival;
await product1.save();

  	}

    return res.status(200).json({ status: true, data:product1 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/editStock", upload.any(), async (req, res) => {
  const { _id,Instock}=req.body;

  try {
      const product1 = await product.findOne({"_id":_id});
      if(product1){
        product1.Instock=Instock;
await product1.save();

        }

    return res.status(200).json({ status: true, data:product1 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});




router.get("/displayAllProduct", async (req, res) => {
  try {
    const products = await product.find();

    return res.status(200).json({ status: true, data:products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/displayNewArrival", async (req, res) => {
  try {
    const products = await product.find({"newArrival":"Yes"});
   console.log(products);

    return res.status(200).json({ status: true, data:products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/getProductById",upload.single(''), async (req, res) => {
   const {_id}=req.body  
try {
    const products = await product.findOne({"_id":_id});
   console.log(products);

    return res.status(200).json({ status: true, data:products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/fetchProductByCategory",upload.single(''), async (req, res) => {
   const {_id}=req.body
try {
    const products = await product.find({"categoryName":_id});
   console.log(products);

    return res.status(200).json({ status: true, data:products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/fetchProducts",upload.single(''), async (req, res) => {
   
try {
    const products = await product.find();
   console.log(products);

    return res.status(200).json({ status: true, data:products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/delete_product",upload.single(''), async (req, res) => {
   const {_id}=req.body


try {
   await product.deleteOne({"_id":_id});
   

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});




module.exports=router
