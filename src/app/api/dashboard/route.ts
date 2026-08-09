import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Appointment from "@/models/Appointment";
import User from "@/models/User";
import Test from "@/models/Test";
import { auth } from "@/auth";

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

    // =========================
    // DATE RANGE
    // =========================

    const now = new Date();

    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );

    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    // =========================
    // START OF WEEK
    // Sunday = 0
    // =========================

    const day = now.getDay();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // =========================
    // TODAY APPOINTMENTS
    // =========================

    const todayAppointments = await Appointment.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: {
        $ne: "cancelled",
      },
    })
      .populate("patient", "name email")
      .populate("test", "testName price")
      .sort({ time: 1 });

    // =========================
    // THIS WEEK COUNT
    // =========================

    const weeklyAppointments = await Appointment.countDocuments({
      date: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
      status: {
        $ne: "cancelled",
      },
    });

    // =========================
    // EMPLOYEES COUNT
    // =========================

    const employeesCount = await User.countDocuments({
      role: "Employee",
    });

    const totalAppointments = await Appointment.countDocuments();

    return NextResponse.json(
      {
        todayAppointments,
        weeklyAppointments,
        employeesCount,
        totalAppointments,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DASHBOARD API ERROR:", error);

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