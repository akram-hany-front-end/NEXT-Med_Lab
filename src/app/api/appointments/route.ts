import connectDB from "@/lib/connectDB";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

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

        const {
            patient,
            patientName,
            test,
            date,
            time,
        } = await request.json();

        if ((!patient && !patientName) || !test || !date || !time) {
            return NextResponse.json(
                {
                    message: "Patient, test, date and time are required",
                },
                { status: 400 }
            );
        }

        const exists = await Appointment.findOne({
            date,
            time,
        });

        if (exists) {
            return NextResponse.json(
                {
                    message: "This appointment is already booked.",
                },
                { status: 400 }
            );
        }

        const appointment = await Appointment.create({
            patient: patient || null,
            patientName: patientName || null,
            test,
            date,
            time,

            employee: session.user.id,
        });

        return NextResponse.json(
            {
                message: "Appointment added successfully",
                appointment,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const appointments = await Appointment.find()
            .populate("patient", "name")
            .populate("test", "testName")
            .populate("employee", "name");

        return NextResponse.json(
            {
                appointments,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

