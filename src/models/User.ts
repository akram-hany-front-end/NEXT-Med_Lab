import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  role: {
    type: String,
      enum: ["Admin", "Employee", "Patient"],
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
});

const User =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;