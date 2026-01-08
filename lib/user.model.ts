import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    task:[{
        
    }]
});

// Prevent model overwrite/recompilation errors in dev (HMR/turbopack)
export const Users = (mongoose.models && mongoose.models.User)
    ? (mongoose.models.User as mongoose.Model<unknown>)
    : mongoose.model('User', userSchema);

