const firm = require('../models/firm');
const vendor = require('../models/vendor');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-'+file.originalname);
    }
});

const upload = multer({ storage: storage });

const addfirm = async(req, res) => {
    try {
        console.log("Logged-in vendor ID:", req.vendorId);
        // Debugging
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { firmname, area, category, region, offer } = req.body;

        if (!req.file) {
            return res.status(400).json({
                error: 'Please upload an image'
            });
        }

        const image = req.file.filename;

        const vender = await vendor.findById(req.vendorId);

        if (!vender) {
            return res.status(404).json({
                error: 'Vendor not found'
            });
        }

        const ferm = new firm({
            firmname,
            area,
            category,
            region,
            offer,
            image,
            vendor: vender._id
        });

        const saver = await ferm.save();
        vender.firms.push(saver)
        await vender.save();

        return res.status(201).json({
            message: 'Firm added successfully'
        });

    } catch (error) {
        console.log('FIRM ERROR:', error.message);

        return res.status(500).json({
            error: error.message
        });
    }
}

const deltefirmid=async(req,res)=>{
    try {
        const delteids=req.params.delt;
        const delte=await firm.findOneAndDelete(delteids);
        if(!delte){
            return res.status(404).json({error:"not found firm id"})

        }
    } catch (error) {
         console.log('FIRM ERROR:', error.message);

        return res.status(500).json({
            error: error.message
        });
        
        
    }
}
module.exports = {
    addfirm: [upload.single('image'), addfirm],deltefirmid
};