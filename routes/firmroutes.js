const express = require('express');
const router = express.Router();

const firmcontroller = require('../controller/firmcontroller');
const verifytoken = require('../middleware/verifytoken');

router.post('/addfirm', verifytoken, firmcontroller.addfirm);
router.get('/uploads/:imagename',(req,res)=>{
    const imagename=req.params.imagename;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(__dirname,'','uploads',imagename);


});
router.get('/:delt',firmcontroller.deltefirmid);

module.exports = router;