const {Schema,model}=require('mongoose')
const cntSchema= new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },

    phno:{
        type:Number,
        required:true
    },
loc:{
        type:String,
        required:true,
        enum:['sim','email','mobile']
    },

})

module.exports=model('contact_app',cntSchema,'contact_app')