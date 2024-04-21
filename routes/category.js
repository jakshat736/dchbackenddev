const express = require('express');
var upload = require("./multer")
const Category = require('./Schemas/categorySchema'); // Import the Category model
const Subcategory=require('./Schemas/subCategorySchema')
const router = express.Router();

// const pool = require('./pool')

// Add a new category
router.post('/addcategory', upload.single(''), async (req, res) => {
  try {
    const { categoryname } = req.body;
    const category = new Category({ categoryname });
    await category.save();
    return res.status(200).json({ result: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});

// Get all categories
router.get('/display_all_category', async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: [] });
  }
});
router.get('/priority', async (req, res) => {
  try {
    const categories = await Category.find({ priority: 1 });
    return res.status(200).json({ data:categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/edit_category_data', async (req, res) => {
  try {
    const { categoryid, categoryname } = req.body;
    await Category.updateOne({ _id: categoryid }, { categoryname });
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false });
  }
});

// Delete a category
router.post('/delete_category_data', async (req, res) => {
  try {
    const { categoryid } = req.body;
    await Category.deleteOne({ _id: categoryid });
    await Subcategory.deleteMany({categoryid:categoryid});
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false });
  }
});


module.exports = router;

