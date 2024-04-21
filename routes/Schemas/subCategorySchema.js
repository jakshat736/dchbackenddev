const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  categoryid: {
    type:String,
    required: true,
  },
  subcategoryname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('SubCategory', subCategorySchema);

