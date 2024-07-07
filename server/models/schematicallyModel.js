import mongoose from "mongoose";

const assestSchema = new mongoose.Schema({
   name: {type:String, required:true},
   description : {type:String, required:true},
   image:{type:String, required:true},
   category:{type:String, required:true}
})

const schematicallyModel = mongoose.models.assest || mongoose.model("assest",assestSchema);

export default schematicallyModel;