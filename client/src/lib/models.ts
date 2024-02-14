import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
      min: 6,
    },
    account_type: {
      type: String,
    },
    isAdmin: {
      type: "boolean",
      default: false,
    },
  },
  { timestamps: true }
);

const Posts_Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Users =
  mongoose.models?.User || mongoose.model("User", UserSchema);
export const Posts =
  mongoose.models?.Post || mongoose.model("Post", Posts_Schema);
