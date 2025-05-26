const {Router}=require("express")
const router=Router()
const cntSchema=require('../model/contactSchema')
const fs= require('fs')
const { resolve } = require("path/posix")
router.get('/style',(req,res)=>{
    fs.createReadStream('public/style.css').pipe(res)
})

router.get('/addContact',(req,res)=>{
    res.render('contact/addContact',{title:'Add Contact'})
})
router.post('/addContact',async(req,res)=>{
    await cntSchema.create(req.body)
    res.redirect('/',302,{})
})



router.get('/allContact',async(req,res)=>{
 let payload =  await cntSchema.find().lean()
    res.render('contact/conlist',{title:'Contact List',payload})
})
router.get('/:id',async(req,res)=>{
 let payload =  await cntSchema.findOne({_id:req.params.id}).lean()
    res.render('contact/singleCont',{title:'Single Contact',payload})
})

router.get('/edit/:id',async(req,res)=>{
 let payload =  await cntSchema.findOne({_id:req.params.id}).lean()
    res.render('contact/editContact',{title:'Edit Contact',payload})
})


router.post('/edit/:id',async(req,res)=>{
 let payload =  await cntSchema.findOne({_id:req.params.id})
 payload.fname=req.body.fname
 payload.lname=req.body.lname
 payload.phno=req.body.phno
 payload.loc=req.body.loc

 await payload.save()
    res.redirect('/api/allContact')
})



router.get('/delete/:id',async(req,res)=>{
  await cntSchema.deleteOne({_id:req.params.id})
    res.redirect('contact/allContact')
})


module.exports=router;