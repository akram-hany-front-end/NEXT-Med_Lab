import mongoose, { Schema } from "mongoose";

const TestSchema = new Schema(
  {
    testName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Test =
  mongoose.models.Test || mongoose.model("Test", TestSchema);

export default Test;