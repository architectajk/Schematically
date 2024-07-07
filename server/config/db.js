import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://architectajk:BYRezwttenWZqhux@cluster0.i9mi9ir.mongodb.net/schematically').then(()=>console.log("DB Connected"));
}