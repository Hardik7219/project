import mongoose, { Schema, Model, models } from "mongoose";


export interface IProgress{
    user :mongoose.Types.ObjectId;
    proDay:string;
    proDate:Date;
    proImage:string;
}

const ProgressSchema = new Schema<IProgress>({
    user : [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    proDay:String,
    proDate :{
        type: Date,
        default : Date.now()
    },
    proImage:String
})


export const Progresss : Model<IProgress> = models.Task || mongoose.model<IProgress>("Progresss",ProgressSchema)
