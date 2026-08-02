import connectDB from "@/lib/connectDB"
import Test from "@/models/Test";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function PATCH(request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const { name, price } = await request.json();
        if (!name || !price) {
            return NextResponse.json(
                { message: "Name and Price are required" },
                { status: 400 }
            );
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    message: "Invalid Test ID",
                },
                {
                    status: 400,
                }
            );
        }
        const updatedTest = await Test.findByIdAndUpdate(
            id,
            {
                name,
                price,
            },
            {
                new: true,
            }
        );
        if (!updatedTest) {
            return NextResponse.json(
                {
                    message: "Test not found",
                },
                {
                    status: 404,
                }
            );
        }
        return NextResponse.json(
            {
                message: "Test updated successfully",
                updatedTest,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error)
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


export async function DELETE(_request: Request,
    { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    message: "Invalid Test ID",
                },
                {
                    status: 400,
                }
            );
        }
        const deletedTest = await Test.findByIdAndDelete(id)
        if (!deletedTest) {
            return NextResponse.json(
                {
                    message: "Test not found",
                },
                {
                    status: 404,
                }
            );
        }
        return NextResponse.json(
            {
                message: "Test deleted successfully",
                deletedTest,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            },
        )
    }

}