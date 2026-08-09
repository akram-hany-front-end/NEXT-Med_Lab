import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { auth } from "@/auth";
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password, phone, age, role, gender } = body;

    if (!name || !email || !password || !phone || !age || !role || !gender) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
await User.create({
  name,
  email,
  password: hashedPassword,
  phone,
  age,
  role,
  gender,
});
return NextResponse.json(
  {
    message: "User created successfully",
  },
  {
    status: 201,
  }
);


  } catch (error) {
    console.log("Error in user registration:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}





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

const user = await User.findById(session.user.id).select("-password");

if (!user) {
  return NextResponse.json(
    { message: "User not found" },
    { status: 404 }
  );
}

return NextResponse.json(
  {
    user,
  },
  { status: 200 }
);

} catch (error) {
console.error("GET PROFILE ERROR:", error);

return NextResponse.json(
  { message: "Internal Server Error" },
  { status: 500 }
);

}
}