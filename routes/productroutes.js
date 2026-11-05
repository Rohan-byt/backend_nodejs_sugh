const express = require('express');
const router = express.Router();

const productcontroller = require('../controller/productcontroller');
router.post('/add-product/:firmId',productcontroller.prosu);
router.get('/:firmid/products', productcontroller.getproductbyfirm);
router.get('/uploads/:imagename',(req,res)=>{
    const imagename=req.params.imagename;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(__dirname,'','uploads',imagename);

});
router.get('/:productid',productcontroller.deleteproduct);

module.exports = router;