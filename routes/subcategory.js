const express = require('express');
var upload = require("./multer")
const Category = require('./Schemas/categorySchema');
const Subcategory = require('./Schemas/subCategorySchema');
const router = express.Router();

router.post('/addsubcategory', upload.single('icon'), async (req, res) => {
  try {
    console.log(req.file)
    const subcategory = new Subcategory({
      categoryid: req.body.categoryid,
      subcategoryname: req.body.subcategoryname,
          });
    await subcategory.save();
    res.status(200).json({result: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({result: false});
  }
});

router.get('/display_all_subcategory', async (req, res) => {
  try {
    const subcategories = await Subcategory.find({}); // Find all subcategories
    return res.status(200).json({ data: subcategories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: [] });
  }
});

router.post('/edit_subcategory', async (req, res) => {
  try {
    const { categoryid, subcategoryname,subcategoryid } = req.body;
    console.log(req.body)
    await Subcategory.updateOne({ _id: subcategoryid }, { categoryid: categoryid, subcategoryname: subcategoryname });
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
});

router.post('/display_subcategory_by_category', async (req, res) => {
  try {
    const { categoryid } = req.body;
    console.log(req.body)
    const data=await Subcategory.find({ categoryid: categoryid });
    console.log(data)
res.status(200).json({ status: true,data:data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
});



router.post('/delete_subcategory', async (req, res) => {
  try {
    const { subcategoryid } = req.body;
    await Subcategory.deleteOne({ _id: subcategoryid });
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
});


module.exports = router;
