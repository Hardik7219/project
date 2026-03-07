import mongoose, { Schema, Model, models } from "mongoose";


export interface ITask{
    user :mongoose.Types.ObjectId;
    taskName :string;
    taskDetail : string;
    taskDate :Date;
    isTaskDone : boolean;
    isTaskRepe:string;
    taskCompletDate:Date,
    streak :number
}

const TaskSchema = new Schema<ITask>({
    user : [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    taskName:String,
    taskDetail:String,
    taskDate:{
        type:Date,
        default: Date.now()
    },
    isTaskDone :{
        type:Boolean,
        default : false,
    },
    isTaskRepe:{
        type:String,
        default : null,
    },
    taskCompletDate:{
        type:Date,
        default :null
    },
    streak : {
        type: Number,
        default:0
    }
})


export const Tasks : Model<ITask> = models.Task || mongoose.model<ITask>("Tasks",TaskSchema)
