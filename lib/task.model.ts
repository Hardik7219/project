import mongoose, { Schema, Model, models } from "mongoose";


export interface ITask{
    user :mongoose.Types.ObjectId[];
    taskName :string;
    taskDetail : string;
    taskDate :Date;
    isTaskDone : boolean;
    isTaskRepe:boolean;
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
        default : new Date(),
    },
    isTaskDone :{
        type:Boolean,
        default : false,
    },
    isTaskRepe:{
        type:Boolean,
        default : false,
    },

})


export const Tasks : Model<ITask> = models.Task || mongoose.model<ITask>("Tasks",TaskSchema)
