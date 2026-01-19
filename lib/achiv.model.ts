import mongoose, { Schema, Model, models } from "mongoose";

export interface IAchiv {
  user: mongoose.Types.ObjectId[];
  title: string;
  detail: string;
  isStar: boolean;
  createDate: Date;
}

const achivSchema = new Schema<IAchiv>(
  {
    user:[ 
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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
    },
  },
  { timestamps: true }
);

export const Achivs: Model<IAchiv> =
  models.Achiv || mongoose.model<IAchiv>("Achiv", achivSchema);
