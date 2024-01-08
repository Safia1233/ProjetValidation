// importation mongoose
 const mongoose = require("mongoose");

// create note schema
  const noteSchema= mongoose.Schema({
    note:Number,
    evaluation:String,
    student :
        {
         type: mongoose.Schema.Types.ObjectId,
         ref:"User"
        },
    cour:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cours"
    }
})

// create Note Model
const note= mongoose.model("Note",noteSchema);

//  exportable model
 module.exports = note   