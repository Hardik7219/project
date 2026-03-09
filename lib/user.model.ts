import mongoose, { Schema, Model, models, Document } from "mongoose";

export interface IUser extends Document {
  userName?: string;
  email?: string;
  password?: string;
  avatar?: string;
  role?:string;
  achiv: mongoose.Types.ObjectId[];
  task : mongoose.Types.ObjectId[];
  progress : mongoose.Types.ObjectId[];
  maxStreakTask : number;
}

const userSchema = new Schema<IUser>({
  userName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type:String,
    enum : ['user','admin'],
    default :'user'
  },
  avatar: String,
  achiv: [
    {
      type: Schema.Types.ObjectId,
      ref: "Achivs",
    },
  ],
  task:[
    {
      type:Schema.Types.ObjectId,
      ref :"Tasks"
    }
  ],
  progress: [
    {
      type:Schema.Types.ObjectId,
      ref:"Progresss"
    }
  ],
  maxStreakTask : {
    type:Number,
  default :0,
},
},
{ timestamps: true }
);

export const Users: Model<IUser> =
  models.User || mongoose.model<IUser>("User", userSchema);
