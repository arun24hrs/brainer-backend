import mongoose, { Schema, Document } from "mongoose";

export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
},{versionKey: false});

const UserModel = mongoose.model<UserType>("User", userSchema);

export default UserModel;
