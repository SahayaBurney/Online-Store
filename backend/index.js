const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const user=require('./mongo')
require('dotenv').config();

app.use(cors());
app.use(express.json());
const uri=process.env.ATLAS_URL;

var database=mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log("connected to db");})
.catch((error)=>{console.log("unsucessful connection to db "+error)})

app.get("/",(req,res)=>{
    res.send("Hello One")
})
app.post("/Display",async(req,res)=>{
  const findmail=await user.findOne({email:req.body.email})
    if(findmail){
        console.log("Content avail");
        res.json({status:(findmail.prod_ord)})
    }
    else{
        console.log("failed login")
        res.json({status:"fail"})
    }
})
app.post("/purchase",async(req,res)=>{
    user.find({prod_post: { $elemMatch: { $elemMatch: { $eq: req.body.product } } } })
    .then(docs => {
        const matchedData = [];
        docs.forEach(doc => {
        const email=doc.email
          const matchedProd = doc.prod_post.find(item => item.includes(req.body.product));
          if (matchedProd) {
            const [name ,url, prod, rate, desc] = matchedProd;
            const userData = {
              email,
              name,
              url,
              prod,
              rate,
              desc
            };
            matchedData.push(userData);
          }
        });
        console.log("data matched")
        res.json({status:matchedData});
      })
      .catch(error => {
        console.error('Error occurred during search:', error);
      });
    
})
app.post("/Register",async(req,res)=>{
    console.log(req.body.nme+" Hello !")
    const adduser = new user({
        name:req.body.nme,
        email:req.body.email,
        pno:req.body.textarea,
        pass:req.body.pass
    })
    const findmail=await user.findOne({email:req.body.email});
    if(findmail){
      console.log("Email Already exists");
      res.json({status:"failed"});
    }
    else{
        adduser.save().then(()=>{
            console.log("Added User")
        })
        res.json({status:"ok"})
    }
})
app.post("/bussiness",async(req,res)=>{
    console.log(req.body.nme+" Hello ! "+req.body.email)
    const findmail=await user.findOne({email:req.body.email});
    user.updateOne({email:req.body.email},{$push:{prod_post:[req.body.nme,req.body.url,req.body.prod,req.body.rate,req.body.desc]}})
    .then(result => {
        console.log('Update successful');
      })
      .catch(error => {
        console.error('Error occurred during update:', error);
      });
})
app.post("/Login",async(req,res)=>{
    const findmail=await user.findOne({email:req.body.email,pass:req.body.pss})
    if(findmail){
        console.log(findmail.prod_post)
        res.json({status:(findmail.name+" "+findmail.email)})
    }
    else{
        console.log("failed login")
        res.json({status:"fail"})
    }
})
app.post("/Billing",async(req,res)=>{
  user.updateOne({email:req.body.brief[0]},{$push:{prod_ord:{"pur_nme":req.body.email,"product":req.body.brief[1],"rate":req.body.brief[2],"address":req.body.add}}})
  .then(result => {
      console.log('Billing done');
      res.json({status:"pass"})
    })
    .catch(error => {
      console.error('Error occurred during update:', error);
    });
  });
  
app.listen(3500,(req,res)=>{
    console.log("Stating at server 3500")
})