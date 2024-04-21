const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  
    themeId: {
    type: String,
    required: true
  },
    name: {
    type: String,
    required: true
  },
    uniqueId: {
    type: String,
    required: true
  },
  images: [
    
  ],

  
 
  
});

const menu = mongoose.model('menus', menuSchema);

module.exports = menu;
