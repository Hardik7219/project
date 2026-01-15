import mongoose from "mongoose";

const achivSchema= new mongoose.Schema({
    user: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    title : String,
    detail: String,
    isStar : Boolean
})

export const Achivs = (mongoose.models && mongoose.models.Achivs)
    ? (mongoose.models.Achivs as mongoose.Model<unknown>)
    : mongoose.model('Achiv', achivSchema);
