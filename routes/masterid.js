const express = require('express');
const router = express.Router();
const masterLogin = require('./Schemas/masterIdSchema');
var upload = require("./multer")
const uuid = require('uuid');
var pool = require('./pool')
const nodemailer = require('nodemailer');
router.post('/masterLogin', upload.single(), async (req, res) => {
    let { name, email, password } = req.body;
    try {
      let master = await masterLogin.findOne({ $or: [{ email }] });
      console.log(!master);

      if (!master) {
        master = new masterLogin({ name, email, password });
        await master.save();
        return res
          .status(200)
          .json({ status: 'true', data: master, message: 'Login successful' });
      } else {
        return res.status(200).json({
          status: 'exist',
          message: 'Email already registered',
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });




router.post('/chkMasterLogin',upload.single(''), async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if a customer with the provided email exists
      const master = await masterLogin.findOne({ email });

      if (master) {
        // Compare the provided password with the stored password
        if (master.password === password) {
          return res.status(200).json({ status: true,data:master, message: 'Login successful' });
        } else {
          return res.status(401).json({ status: false, message: 'Incorrect password' });
        }
      } else {

        return res.status(404).json({ status: false, message: 'Customer not found' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

 router.get('/displayallusers', async (req, res) => {
    try {


      const master = await masterLogin.find();

      if (!master) {
        return res.status(404).json({ error: 'User details not found' });
      }

      return res.status(200).json({status:true,data:master});
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Failed to retrieve user details' });
    }
  });


  router.post('/updatePassword',upload.single(''),async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if a customer with the provided email exists
      const master = await masterLogin.findOne({ email });

      if (master) {
        // Update the password
        master.password = password;
        await master.save();

        return res.status(200).json({ status: true, message: 'Password updated successfully' });
      } else {
        return res.status(404).json({ status: false, message: 'Customer not found' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

 router.post('/deleteid',upload.single(''),async (req, res) => {
    const {_id} = req.body;

    try {
      // Check if a customer with the provided email exists
      const master = await masterLogin.deleteOne({ _id });

      if (master) {

        return res.status(200).json({ status: true, message: 'Password updated successfully' });
      } else {
        return res.status(404).json({ status: false, message: 'Customer not found' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });




  module.exports = router;
