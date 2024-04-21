const express = require("express");
const router = express.Router();
const menu = require("./Schemas/menuSchema");
var upload = require("./multer");
const uuid = require("uuid");
var pool = require("./pool");
const fs=require('fs');

router.post("/addmenu", upload.any(), async (req, res) => {
  const { themeId, name } = req.body;
  let images=[]

  req.files.map((item,index)=>{
       images[index]=item.filename
  })

  try {
    const existingMenu = await menu.findOne({ name: name });

    let uniqueId = name.split(' ').join('');

    // If the menu already exists, add a number suffix to make it unique
    if (existingMenu) {
      let suffix = 0;
      while (true) {
        suffix++;
        uniqueId = `${uniqueId}${suffix}`;

        const menuWithUniqueId = await menu.findOne({ uniqueId: uniqueId });
        if (!menuWithUniqueId) {
          break;
        }
      }
      console.log(uniqueId)
    }

    const newMenu = new menu({
      themeId,
      name,
      uniqueId,
      images, // Use the images array directly
    });

    const savedMenu = await newMenu.save();

    return res.status(200).json({ status: true, data: savedMenu });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/getMenubyId", upload.any(), async (req, res) => {
  const { uniqueId} = req.body;
  
  try {
    const Menu = await menu.findOne({ uniqueId: uniqueId });
   console.log(Menu)
   
    return res.status(200).json({ status: true, data: Menu });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


  module.exports=router
  
