// importation mongoose module
const mongoose = require("mongoose")
// create schema model
const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    tel:Number,
    adresse:String,
    pwd:String,
    speciality:String,
    telEnfant:Number,
    role:String,
    status:String,
    img:String,
    file:String,

    cour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cours"
      },
     note:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Note"
    }
})
// create user Model
const user = mongoose.model("User", userSchema);

// export user
module.exports = user;
