// import mongoode module
const mongoose= require("mongoose")

// create schema cour
const courSchema= mongoose.Schema({
    nameCour:String,
    description:String,
    dure:Number,
    avatar:String,
   
    students :[
    {
     type: mongoose.Schema.Types.ObjectId,
     ref:"User"
    }],
    teacher : {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
    note : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Note"
        },
})
 


// create model cour
const cours = mongoose.model("Cours",courSchema)
// exports cour
module.exports=cours