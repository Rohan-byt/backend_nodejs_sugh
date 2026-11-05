const vendor=require('../models/vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');
dotenv.config();
const sec=process.env.hwo;

const vendorregis=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const vendorem=await vendor.findOne({email})
        if (vendorem){
            return res.status(400).json('email already exists');
        
        }
        const vendorpass= await bcrypt.hash(password,10);
        const newven=new vendor({
            username,email,password:vendorpass
        });
        await newven.save();
        res.status(201).json('registered successfully');
        console.log('registered');


    }catch(error){
        console.log('error catched:',error);
        res.status(500).json({error:error.message});
    }
}
const vendorlogin=async(req,res)=>{
    const{email,password}=req.body;
    try{
         const vendorgt=await vendor.findOne({email});
         if (!vendorgt || !(await bcrypt.compare(password, vendorgt.password))) {
            return res.status(400).json({
          error: 'invalid username or password'
             });
            }
        const token = jwt.sign(
    { vendorId: vendorgt._id },
    sec,
    { expiresIn: '1h' }
);
         res.status(201).json({success:"login successfull",token})
         console.log(email,'this is token:',token);


    } catch(error){
        console.log(error);
        res.status(404).json({err:error})

    }
}
const getallvendor=async(req,res)=>{
    try{
        const vendorss=await vendor.find().populate('firms');
        res.json({vendorss})
        

    }catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error"})
        
    }
}
const getvendorid=async(req,res)=>{
    const vendid=req.params.id;
    try{
        const vend=await vendor.findById(vendid).populate('firms');
        if(!vend){
            return res.status(404).json({error:"vendor not found"})

        }
        return res.status(200).json({vend})

    }catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error"})

    }
}
module.exports={vendorregis,vendorlogin,getallvendor,getvendorid};
