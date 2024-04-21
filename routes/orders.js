const express = require('express');
const router = express.Router();
const orders = require('./Schemas/orderSchema');
var upload = require("./multer")
const uuid = require('uuid');
var pool = require('./pool')

router.post('/addOrderDetails', upload.single('logo'), async (req, res) => {
    let { name, email,phone,date,fullAddress,city,district,state,pincode} = req.body;
    
	const products=JSON.parse(req.body.products)
	console.log(req.body.products);
    console.log(req.body)
    console.log(req.file);	
    try {
      
      let  order = new orders({ name:name,email:email, phone:phone,date:date,fullAddress:fullAddress,products:products });
        await order.save();
        console.log(order)
        console.log(order._id);
        return res
          .status(200)
          .json({ status: 'true', data: order, message: 'Saved successful' });
     
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


router.post('/updatePayment', upload.single(''), async (req, res) => {
    let { _id,payment,status} = req.body;


    try {

      let  order = await orders.findOne({_id:_id})
        order.payment=payment;
        order.status=status
        await order.save();
        console.log(order)
        console.log(order._id);
        return res
          .status(200)
          .json({ status: 'true', data: order, message: 'Saved successful' });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


router.post('/updateStatus', upload.single(''), async (req, res) => {
    let { _id,status} = req.body;


    try {

      let  order = await orders.findOne({_id:_id})
        order.status=status
        await order.save();
        console.log(order)
        console.log(order._id);
        return res
          .status(200)
          .json({ status: 'true', data: order, message: 'Saved successful' });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });



router.get('/getOrders',  async (req, res) => {
   

    try {

      let  order = await orders.find()
       
       console.log(order)
   return res
          .status(200)
          .json({ status: 'true', data: order, message: 'Saved successful' });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


router.post('/getOrderDetails', upload.single(''), async (req, res) => {
    let { _id} = req.body;


    try {

      let  order = await orders.findOne({_id:_id})
       
        console.log(order)
        console.log(order._id);
        return res
          .status(200)
          .json({ status: 'true', data: order, message: 'Saved successful' });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  module.exports = router;
