import connectDB from "@/lib/connectDB";
import Schedule from "@/models/Schedule";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { days, startTime, endTime, duration, slots } =
      await request.json();

    if (
      !days ||
      days.length === 0 ||
      !startTime ||
      !endTime ||
      !duration ||
      !slots ||
      slots.length === 0
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const schedule = await Schedule.findOneAndUpdate(
      {},
      {
        days,
        startTime,
        endTime,
        duration,
        slots,
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );

    return NextResponse.json(
      {
        message: "Schedule saved successfully",
        schedule,
      },
      {
        status: 201,
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

export async function GET() {
  try {
    await connectDB();

    const schedules = await Schedule.findOne();

    return NextResponse.json(
      {
        schedules,
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