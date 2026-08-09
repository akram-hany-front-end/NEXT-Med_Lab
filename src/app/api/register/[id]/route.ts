import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { auth } from "@/auth";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

// UPDATE PROFILE
export async function PATCH(
    req: NextRequest,
    { params }: Params
) {
    try {
        await connectDB();


        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid user id" },
                { status: 400 }
            );
        }

        if (session.user.id !== id) {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const body = await req.json();

        const {
            name,
            email,
            phone,
            age,
            gender,
            password,
        } = body;

        const updateData: Record<string, unknown> = {};

        if (name !== undefined) {
            updateData.name = name;
        }

        if (email !== undefined) {
            updateData.email = email;
        }

        if (phone !== undefined) {
            updateData.phone = phone;
        }

        if (age !== undefined) {
            updateData.age = age;
        }

        if (gender !== undefined) {
            updateData.gender = gender;
        }

        // لو المستخدم غير الباسورد
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Profile updated successfully",
                user,
            },
            { status: 200 }
        );


    } catch (error) {
        console.error("PATCH PROFILE ERROR:", error);


        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );


    }
}

// DELETE PROFILE
export async function DELETE(
    req: NextRequest,
    { params }: Params
) {
    try {
        await connectDB();


        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid user id" },
                { status: 400 }
            );
        }

        if (session.user.id !== id) {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Profile deleted successfully",
            },
            { status: 200 }
        );


    } catch (error) {
        console.error("DELETE PROFILE ERROR:", error);


        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );


    }
}
