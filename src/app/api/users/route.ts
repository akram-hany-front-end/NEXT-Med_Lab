import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { auth } from "@/auth";

// GET USERS
export async function GET(request: Request) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const role = searchParams.get("role");
    const search = searchParams.get("search");

    const query: {
      role?: string;
      $or?: {
        name?: { $regex: string; $options: string };
        email?: { $regex: string; $options: string };
      }[];
    } = {};

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Search by name or email
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}