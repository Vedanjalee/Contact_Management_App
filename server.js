const express=require('express')
const app= express()
require('dotenv').config()
const {connectDb}= require("./config/db")

const cntRoute=require('./router/cntRouter')
const {engine}=require('express-handlebars')
let PORT =process.env.PORT
connectDb()
app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api",cntRoute)


app.get('/home',(req,res)=>{
    res.render('home',{title:"HOME PAGE"})
})

app.listen(PORT,err=>{
    if(err)throw err
    console.log("Server is running on port 5000")
})