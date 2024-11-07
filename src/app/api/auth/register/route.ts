import { NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/lib/MongodbClient";
import { Register } from "@/lib/ZodSchemas";
export async function POST(request: Request) {
  try {
    // Validating the data with Zod
    const FormData = await request.json();
    const submission = Register.safeParse(FormData);
    if (!submission.success) {
      console.log(submission.error.flatten().fieldErrors);
      return NextResponse.json(
        { error: submission.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email: FormData.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 },
      );
    }

    const { name, email, password } = FormData;
    const bcrypt = require("bcrypt");

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();

    await User.create({
      name,
      email,
      password: hashedPassword,
      image: "/images/user/default-user.png",
    });

    return NextResponse.json(
      { success: "Account created successfully" },
      { status: 202 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
