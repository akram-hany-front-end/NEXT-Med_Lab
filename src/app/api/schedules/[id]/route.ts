import connectDB from "@/lib/connectDB";
import Schedule from "@/models/Schedule";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid schedule id" },
                { status: 400 }
            );
        }

        const { days, startTime, endTime, duration, slots } =
            await request.json();

        const updatedSchedule = await Schedule.findByIdAndUpdate(
            id,
            {
                days,
                startTime,
                endTime,
                duration,
                slots,
            },
            {
                returnDocument: "after",
            }
        );

        if (!updatedSchedule) {
            return NextResponse.json(
                { message: "Schedule not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Schedule updated successfully",
                schedule: updatedSchedule,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}