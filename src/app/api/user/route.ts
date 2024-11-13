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

    let users = await User.find().select(
      "name phonenumber bio image email createdAt status",
    );
    if (!users) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    users = users.map((user, index) => ({
      ...user.toObject(),
      key: index,
    }));

    return NextResponse.json(
      { users: users, message: "Success" },
      { status: 202 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
