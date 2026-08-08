import connectDB from "@/lib/connectDB";
import Result from "@/models/Result";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// UPDATE RESULT
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate Result ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          message: "Invalid Result id",
        },
        {
          status: 400,
        },
      );
    }

    const {
      result,
      comment,
    } = await request.json();

    // Validate fields
    if (!result) {
      return NextResponse.json(
        {
          message: "Result is required",
        },
        {
          status: 400,
        },
      );
    }

    const updatedResult = await Result.findByIdAndUpdate(
      id,
      {
        result,
        comment: comment || "",
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate([
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

    if (!updatedResult) {
      return NextResponse.json(
        {
          message: "Result not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Result updated successfully",
        result: updatedResult,
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

// DELETE RESULT
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate Result ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          message: "Invalid Result id",
        },
        {
          status: 400,
        },
      );
    }

    const deletedResult = await Result.findByIdAndDelete(id);

    if (!deletedResult) {
      return NextResponse.json(
        {
          message: "Result not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Result deleted successfully",
        result: deletedResult,
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
