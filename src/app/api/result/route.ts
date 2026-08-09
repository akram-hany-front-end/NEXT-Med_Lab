import connectDB from "@/lib/connectDB";
import Appointment from "@/models/Appointment";
import Result from "@/models/Result";
import Test from "@/models/Test";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
// GET RESULTS
export async function GET() {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const role = session.user.role;

    // Admin & Employee → see all results
    // Patient → see only their own results
    const query =
      role === "Admin" || role === "Employee"
        ? {}
        : { patient: session.user.id };

    const results = await Result.find(query)
      .populate("patient", "name email")
      .populate("employee", "name")
      .populate({
        path: "appointment",
        populate: [
          {
            path: "patient",
            select: "name email",
          },
          {
            path: "test",
            select: "testName price",
            model: Test,
          },
        ],
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        results,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET RESULTS ERROR:", error);

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



// CREATE RESULT
export async function POST(request: Request) {
  try {
    await connectDB();
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const employee = session.user.id;

    const {
      appointment,
      result,
      comment,
    } = await request.json();

    // Validation

    if (!appointment || !result) {
      return NextResponse.json(
        {
          message: "Appointment and result are required",
        },
        {
          status: 400,
        }
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
      patient: appointmentData.patient,
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

