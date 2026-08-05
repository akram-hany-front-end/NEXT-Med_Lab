import mongoose, { Schema } from "mongoose";

const ScheduleSchema = new Schema(
  {
    days: {
      type: [String],
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },
        slots: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule =
  mongoose.models.Schedule ||
  mongoose.model("Schedule", ScheduleSchema);

export default Schedule;