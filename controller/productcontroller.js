const product=require('../models/product');

const multer=require('multer');
const firm = require('../models/firm');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    
    
    },filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
});
const upload=multer({storage:storage});
const prosu=async(req,res)=>{
    try {
        const{productname
            ,price
            ,category
           
            ,bestseller
            ,description
            } =req.body;
            console.log("PRODUCT BODY:", req.body);
console.log("PRODUCT FILE:", req.file);
            if (!req.file) {
            return res.status(400).json({
                error: 'Please upload an image'
            });
        }
        const image = req.file.filename;
        const firmId=req.params.firmId;
        const firms=await firm.findById(firmId);
        if(!firms){
            return res.status(404).json({error:"no firm found"})

        }
        const products= new product({
            productname
            ,price
            ,category
            ,image
            ,bestseller 
            ,description
            ,firms:firms._id

        })
            const saved=await products.save();
            firms.products.push(saved._id);
            await firms.save();
            res.status(200).json(saved)
        }catch (error) {
        console.error(error);
        res.status(500).json({error:'internla error productconttroller'})

    }
}
const getproductbyfirm=async(req,res)=>{
    try {
        const firmid=req.params.firmid;
        const firms=await firm.findById(firmid);
        if(!firms){
            return res.status(400).json({error:"no firm found"});

        }
        const restorant=firms.firmname;
        const products=await product.find({firms:firmid});
        res.status(200).json({restorant,products});
        
    } catch (error) {
         console.error(error);
        return res.status(500).json({error:'internla error productconttroller'})
        
    }
}
const deleteproduct=async(req,res)=>{
    try {
        const deleteu=req.params.productid
        const deletepro=await product.findByIdAndDelete(deleteu);
        if(!deletepro){
            return res.status(404).json({error:'no id found'})
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:'internla error productconttroller'})

        
    }
}
module.exports={prosu:[upload.single('image'),prosu],getproductbyfirm,deleteproduct};