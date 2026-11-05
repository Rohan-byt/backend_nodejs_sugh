const vendorcontroller=require('../controller/vendorcontroller');
const express=require('express');
const router=express.Router();
router.post('/register',vendorcontroller.vendorregis);
router.post('/login',vendorcontroller.vendorlogin);
router.get('/all-vendors',vendorcontroller.getallvendor);
router.get('/single/:id',vendorcontroller.getvendorid);
module.exports=router;
