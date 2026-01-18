import mongoose, { Schema, Model, models, Document } from "mongoose";

export interface IUser extends Document {
  userName?: string;
  email?: string;
  password?: string;
  avatar?: string;
  achiv: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  userName: String,
  email: String,
  password: String,
  avatar: String,
  achiv: [
    {
      type: Schema.Types.ObjectId,
      ref: "Achivs",
    },
  ],
});

export const Users: Model<IUser> =
  models.User || mongoose.model<IUser>("User", userSchema);
