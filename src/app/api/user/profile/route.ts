import { NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/lib/MongodbClient";
import { Profile } from "@/lib/ZodSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    //@ts-ignore
    const id = session?.user?.id;

    await connectMongoDB();

    let user = await User.findById(id).select("name phonenumber bio");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { user: user, message: "Success" },
      { status: 202 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
    const submission = Profile.safeParse(FormData);
    if (!submission.success) {
      return NextResponse.json(
        { error: submission.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { name, phonenumber, bio } = FormData;

    await connectMongoDB();

    await User.findById(id).updateOne({
      name: name,
      phonenumber: phonenumber,
      bio: bio,
    });

    return NextResponse.json(
      { success: "Edited successfully" },
      { status: 202 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
