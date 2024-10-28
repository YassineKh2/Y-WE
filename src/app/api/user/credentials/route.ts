import { NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/lib/MongodbClient";
import { Credentials } from "@/lib/ZodSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    //@ts-ignore
    const id = session?.user?.id;

    // Validating the data with Zod
    const FormData = await request.json();
    const submission = Credentials.safeParse(FormData);
    if (!submission.success) {
      return NextResponse.json(
        { error: submission.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { email, password } = FormData;

    await connectMongoDB();

    if (!password) {
      await User.findById(id).updateOne({ email: email });
    } else {
      const bcrypt = require("bcrypt");
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findById(id).updateOne({ email, password: hashedPassword });
    }

    return NextResponse.json(
      { success: "Edited successfully" },
      { status: 202 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
