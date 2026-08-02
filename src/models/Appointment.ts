import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema(
  {
patient: {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

  test: {
  type: Schema.Types.ObjectId,
  ref: "Test",
  required: true,
},
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
 employee: {
  type: Schema.Types.ObjectId,
  ref: "User",
    default: null,
},
  },
  {
    timestamps: true,
  }
);

const Appointment =
  mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);

export default Appointment;