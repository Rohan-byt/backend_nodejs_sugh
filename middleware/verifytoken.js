
const vendor=require('../models/vendor');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const sec=process.env.hwo;

const verifytoken=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(400).json({error:'token is required'})
    }
    try {
    const decode = jwt.verify(token, sec);

console.log("Decoded token:", decode);
console.log("Vendor ID:", decode.vendorId);

const vender = await vendor.findById(decode.vendorId);

console.log("Vendor found:", vender);

if (!vender) {
    return res.status(404).json({
        error: 'Vendor not found'
    });
}

req.vendorId = vender._id;
next();
        
    } catch (error) {
        console.log("Vendor ID:", req.vendorId);
    console.log("Body:", req.body);
    console.log("File:", req.file);
        console.log(error);
        res.status(500).json({mess:error})
    }
    
}
module.exports=verifytoken;