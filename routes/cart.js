const express = require('express');
var upload = require("./multer")
const Cart= require('./Schemas/cartSchema'); // Import the Category model
const router = express.Router();
// Add a product to the cart

// Define the POST API endpoint for inserting products into the cart
router.post('/add',upload.any(), (req, res) => {
 console.log(req.body)
 console.log("jsnjn",req.files)
 const file=req.files 
 const mobile = req.body.mobile;
   const logoFileName = req.files.length > 0 ? req.files[0].originalname : '';

  const newProduct = {
    productId: req.body.productId,
    productName:req.body.productName,
    count: req.body.count,
    companyName: req.body.companyName,
    Logo: logoFileName,
    Link: req.body.Link,
    Description: req.body.Description,
  };
  Cart.findOne({ mobile: mobile })
    .then((cart) => {
      if (cart) {
        // Mobile number exists, so add product to the existing cart
        const existingProductIndex = cart.products.findIndex(
          (product) => product.productId === newProduct.productId
        );

        if (existingProductIndex !== -1) {
          // Product with the same productId already exists, replace it
          cart.products[existingProductIndex] = newProduct;
        } else {
          // Product with productId not found, add the new product to the cart
          cart.products.push(newProduct);
        }

        return cart.save();
   } else {
        // Mobile number doesn't exist, so create a new cart
        const newCart = new Cart({
          mobile: mobile,
          products: [newProduct]
        });
        return newCart.save();
      }
    })
    .then(() => {
      return res.status(200).json({ result: true});
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ result: false,message: 'Internal server error' });
    });
});
  // Get all products in the cart for a mobile number
router.post('/getAllProducts', upload.single(''),async (req, res) => {
    const { mobile } = req.body;
    console.log(mobile)  
    try {
      const cart = await Cart.findOne({ mobile });
      console.log(cart)
  
      if (!cart) {
        // If cart does not exist for the mobile number, return an error
        return res.status(400).json({ result: false, message: 'Cart not found' });
      } else {
        // If cart exists for the mobile number, return all the products in the cart
        return res.status(200).json({ result: true, products: cart.products });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  // Remove a product from the cart
  router.post('/remove',upload.single(''), async (req, res) => {
    const { mobile, productId } = req.body;
  
    try {
      let cart = await Cart.findOne({ mobile });
  
      if (!cart) {
        // If cart does not exist for the mobile number, return an error
        res.status(400).json({ result: false, message: 'Cart not found' });
      } else {
        // If cart already exists for the mobile number, remove the product from the cart
        const productIndex = cart.products.findIndex(product => product.productId === productId);
        if (productIndex >= 0) {
          // Product found, so remove it from the cart
          cart.products.splice(productIndex, 1);
          await cart.save();
          res.status(200).json({ result: true, message: 'Product removed from cart' });
        } else {
          // Product not found in cart, so return an error
          res.status(400).json({ result: false, message: 'Product not found in cart' });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/cartsdelete',upload.single(''), async (req, res) => {
    const { mobile } = req.body;
    console.log(req.body)  
    try {
      // Find the cart by _id and remove it
      const deletedCart = await Cart.findOneAndRemove({ mobile: mobile });
      if (!deletedCart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      return res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;
  router.post('/update-count', upload.single(''), async (req, res) => {
    const { mobile, productId, count } = req.body;
  
    try {
      let cart = await Cart.findOne({ mobile });
  
      if (!cart) {
        // If cart does not exist for the mobile number, return an error
        res.status(400).json({ result: false, message: 'Cart not found' });
      } else {
        // If cart already exists for the mobile number, find the product in the cart and update its count
        const productIndex = cart.products.findIndex(product => product.productId === productId);
        if (productIndex >= 0) {
          // Product found, so update its count
          cart.products[productIndex].count = count;
          await cart.save();
          res.status(200).json({ result: true, message: 'Product count updated in cart' });
        } else {
          // Product not found in cart, so return an error
          res.status(400).json({ result: false, message: 'Product not found in cart' });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  module.exports = router;
