import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    task:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Tasks"
    }]
});

export const Users = (mongoose.models && mongoose.models.User)
    ? (mongoose.models.User as mongoose.Model<unknown>)
    : mongoose.model('User', userSchema);

