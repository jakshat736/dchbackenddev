var express = require('express');
var router = express.Router();
var menuOrderSchema=require('./Schemas/orderModal');
const upload = require('./multer');


// Other required imports...

// Updated route for updating the status of a menu order using POST
router.post('/updateStatus',upload.any(), async (req, res) => {
  const { _id, status } = req.body;
  console.log(req.body)

  try {
    const updatedOrder = await menuOrderSchema.findOne({_id})
    if (updatedOrder) {
    updatedOrder.status=status;
    await updatedOrder.save()

   
      return res.status(200).json({ status:true,message: 'Status updated successfully', updatedOrder });
    } else {
      return res.status(404).json({status:false, message: 'Menu order not found' });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({status:false, message: 'Internal Server Error' });
  }
});

router.post('/checkStatus',upload.any(), async (req, res) => {
  const { _id } = req.body;
  console.log(req.body)

  try {
    const updatedOrder = await menuOrderSchema.findOne({_id})
    if (updatedOrder) {
  

      return res.status(200).json({ status:true,message: 'Status updated successfully', orderStatus:updatedOrder.status });
    } else {
      return res.status(404).json({status:false, message: 'Menu order not found' });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({status:false, message: 'Internal Server Error' });
  }
});


module.exports = router;














