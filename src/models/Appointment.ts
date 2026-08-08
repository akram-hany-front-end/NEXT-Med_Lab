import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    patientName: {
      type: String,
      default: null,
      trim: true,
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

    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },
  },
  {
    timestamps: true,
  }
);

AppointmentSchema.index(
  { date: 1, time: 1 },
  { unique: true }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);

export default Appointment;