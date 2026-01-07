import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    userName:String,
    email: String,
    password:String,
    task : [{
    }]
})


export const Users = mongoose.model("User",userSchema);

