import connectDB from "@/lib/connectDB";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        await connectDB();

        const { patient, test, date, time, employee, status } =
            await request.json();

        if (
            !patient ||
            !test ||
            !date ||
            !time 
            
        ) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }
        const exists = await Appointment.findOne({
            date,
            time,
        });

        if (exists) {
            return NextResponse.json(
                { message: "This appointment is already booked." },
                { status: 400 }
            );
        }


        const appointment = await Appointment.create(
            {
                patient,
                test,
                date,
                time,
                employee: employee || null,
            });

        return NextResponse.json(
            {
                message: "Appointment added successfully",
                appointment,
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

        const appointments = await Appointment.find()
            .populate("patient", "name")
            .populate("test", "testName")
            .populate("employee", "name")

        return NextResponse.json(
            {
                appointments,
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