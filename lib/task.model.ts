import mongoose from "mongoose";

const taskSchema= new mongoose.Schema({
    user: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    title : String,
    detail: String,
    isDone : Boolean
})

export const Tasks = (mongoose.models && mongoose.models.Tasks)
    ? (mongoose.models.Tasks as mongoose.Model<unknown>)
    : mongoose.model('Task', taskSchema);
