const mongoose=require('mongoose');
const product=require('./product')
const firmschema=new mongoose.Schema({
    
    firmname:{type:String,required:true,unique:true},
    area:{type:String,required:true},
    category:{type:[{
        type:String,enum:['veg', 'non-veg']
    }]},
    region:{type:[
        {
            type:String,enum:['north-indian','south-indian','chinese','bakery']
        }
    ]},
    offer:{type:String,required:true},
    image:{type:String,required:true},
    vendor:[{type:mongoose.Schema.Types.ObjectId,
        ref:'vendor'
    }],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]


})

const firm=mongoose.model('firm',firmschema);
module.exports=firm;