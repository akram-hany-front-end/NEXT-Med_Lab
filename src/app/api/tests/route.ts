import connectDB from "@/lib/connectDB";
import Test from "@/models/Test";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, price } = body;

    if (!name || !price) {
      return NextResponse.json(
        { message: "Name and Price are required" },
        { status: 400 }
      );
    }

    const test = await Test.create({
      name,
      price,
    });

    return NextResponse.json(
      {
        message: "Test created successfully",
        test,
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

  const tests = await Test.find();
  return NextResponse.json(
    {
      message: "Tests fetched successfully",
      tests,
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