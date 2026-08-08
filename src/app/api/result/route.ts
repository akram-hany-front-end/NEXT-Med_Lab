import connectDB from "@/lib/connectDB";
import Appointment from "@/models/Appointment";
import Result from "@/models/Result";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// GET ALL RESULTS
export async function GET() {
  try {
    await connectDB();

    const results = await Result.find()
      .populate("patient", "name email")
      .populate("employee", "name")
      .populate({
        path: "appointment",
        populate: {
          path: "test",
          select: "testName price",
        },
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        results,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

// CREATE RESULT
export async function POST(request: Request) {
  try {
    await connectDB();

    const {
      appointment,
      result,
      comment,
      employee,
    } = await request.json();

    // Validation
    if (!appointment || !result || !employee) {
      return NextResponse.json(
        {
          message: "Appointment, result and employee are required",
        },
        {
          status: 400,
        },
      );
    }

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(appointment) ||
      !mongoose.Types.ObjectId.isValid(employee)
    ) {
      return NextResponse.json(
        {
          message: "Invalid appointment or employee id",
        },
        {
          status: 400,
        },
      );
    }

    // Check appointment
    const appointmentData = await Appointment.findById(appointment);

    if (!appointmentData) {
      return NextResponse.json(
        {
          message: "Appointment not found",
        },
        {
          status: 404,
        },
      );
    }

    // Check if result already exists
    const existingResult = await Result.findOne({
      appointment,
    });

    if (existingResult) {
      return NextResponse.json(
        {
          message: "This appointment already has a result",
        },
        {
          status: 400,
        },
      );
    }

    // Create result
    const newResult = await Result.create({
      appointment,
      patient: appointmentData.patient || null,
      employee,
      result,
      comment: comment || "",
    });

    // Populate response
    await newResult.populate([
      {
        path: "patient",
        select: "name email",
      },
      {
        path: "employee",
        select: "name",
      },
      {
        path: "appointment",
        populate: {
          path: "test",
          select: "testName price",
        },
      },
    ]);

    return NextResponse.json(
      {
        message: "Result added successfully",
        result: newResult,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

