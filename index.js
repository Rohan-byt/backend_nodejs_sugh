const express=require('express')
const app=express()
const  dotenv=require('dotenv')
const mongoose=require('mongoose')
const vendorroute=require('./routes/vendorroutes')
const firmroutes=require('./routes/firmroutes')
const productroutes=require('./routes/productroutes')
// const bodyParser = require('body-parser');
const port=process.env.PORT||4000;
dotenv.config();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/product',productroutes);
app.use('/vendor',vendorroute);
app.use('/firm',firmroutes);
app.use('/uploads',express.static('uploads'));
app.get('/',(req,res)=>{
    res.send('welcome to home')
})
mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log('mongodb connected succcessfully ');
    app.listen(port,()=>{console.log(`server connected successfully ${port}`)})
}
).catch((error)=>console.log('error occur during connecting mongodb',error.message))




