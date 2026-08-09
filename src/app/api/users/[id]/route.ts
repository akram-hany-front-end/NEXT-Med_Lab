import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { auth } from "@/auth";
import { Roles } from "@/constants/Roles";
import mongoose from "mongoose";

// PATCH - Admin only
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const session = await auth();

    // Check Admin
    if (session?.user?.role !== Roles.ADMIN) {
      return NextResponse.json(
        { message: "Forbidden: Admin only" },
        { status: 403 },
      );
    }

    const { id } = await params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 },
      );
    }

    const body = await req.json();

    const { name, email, age, phone } = body;

    // Validate fields
    if (!name || !email || !age || !phone) {
      return NextResponse.json(
        { message: "Name, email, age and phone are required" },
        { status: 400 },
      );
    }

    // Check email belongs to another user
    const existingUser = await User.findOne({
      email,
      _id: { $ne: id },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        age,
        phone,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "User updated successfully",
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH USER ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// DELETE - Admin only
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const session = await auth();

    // Check Admin
    if (session?.user?.role !== Roles.ADMIN) {
      return NextResponse.json(
        { message: "Forbidden: Admin only" },
        { status: 403 },
      );
    }

    const { id } = await params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 },
      );
    }

    // Don't allow admin to delete himself
    if (session.user.id === id) {
      return NextResponse.json(
        { message: "You cannot delete your own account" },
        { status: 400 },
      );
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "User deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}