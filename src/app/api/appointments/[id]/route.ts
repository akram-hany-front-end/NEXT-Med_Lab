import connectDB from "@/lib/connectDB";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid Appointment id" },
                { status: 400 },
            );
        }

        const {
            patient,
            patientName,
            test,
            date,
            time,
            employee,
            status,
        } = await request.json();

        if (!test || !date || !time) {
            return NextResponse.json(
                { message: "Test, date and time are required" },
                { status: 400 },
            );
        }

        // لو فيه patient مستخدم مسجل
        // لازم يكون ObjectId صحيح
        if (patient && !mongoose.Types.ObjectId.isValid(patient)) {
            return NextResponse.json(
                { message: "Invalid patient id" },
                { status: 400 },
            );
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            {
                patient: patient || null,
                patientName: patientName || null,
                test,
                date,
                time,
                employee: employee || null,
                ...(status && { status }),
            },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!updatedAppointment) {
            return NextResponse.json(
                { message: "Appointment not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                message: "Appointment updated successfully",
                appointment: updatedAppointment,
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

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid Appointment id" },
                { status: 400 },
            );
        }

        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return NextResponse.json(
                { message: "Appointment not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                message: "Appointment deleted successfully",
                appointment: deletedAppointment,
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