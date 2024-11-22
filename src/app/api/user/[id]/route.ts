import { NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/lib/MongodbClient";
import { Profile } from "@/lib/ZodSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Event from "@/models/Event";
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    //@ts-ignore
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = params;
    await connectMongoDB();

    const user = await User.findById(id).select("status ban");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.status === "BANNED") {
      user.status = "ACTIVE";
      await user.save();
    } else {
      user.status = "BANNED";
      await user.save();
    }

    return NextResponse.json({ success: "Success !" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
