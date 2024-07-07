import schematicallyModel from "../models/schematicallyModel.js";
import fs from 'fs'

//Add assest items

const addAssest = async (req,res)=>{
    let image_filename = `${req.file.filename}`;
    const assest = new schematicallyModel({
        name:req.body.name,
        description:req.body.description,
        image:image_filename,
        category:req.body.category
    })
    try{
        await assest.save();
        res.json({success:true,message:"Assest Added"})
    }catch(error){
        console.log(error)
        res.json({sucess:false,message:"Error"})
    }
}
export {addAssest}