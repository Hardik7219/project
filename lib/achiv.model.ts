import mongoose, { Schema, Model, models, Document } from "mongoose";

/* 1️⃣ Achievement Interface */
export interface IAchiv extends Document {
  user: mongoose.Types.ObjectId[];
  title?: string;
  detail?: string;
  isStar?: boolean;
  createDate?: Date;
}

/* 2️⃣ Typed Schema */
const achivSchema = new Schema<IAchiv>(
  {
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // 🔴 must match User model name
      },
    ],
    title: String,
    detail: String,
    isStar: {
      type: Boolean,
      default: false,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* 3️⃣ Typed Model */
export const Achivs: Model<IAchiv> =
  models.Achiv || mongoose.model<IAchiv>("Achiv", achivSchema);
