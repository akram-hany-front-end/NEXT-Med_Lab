import mongoose, { Schema } from "mongoose";

const ResultSchema = new Schema(
    {
        appointment: {
            type: Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
        },
        patient: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        result: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Result =
    mongoose.models.Result || mongoose.model("Result", ResultSchema);

export default Result;