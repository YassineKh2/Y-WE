import { NextResponse } from "next/server";
import Event from "@/models/Event";
import connectMongoDB from "@/lib/MongodbClient";
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

    let events = await Event.find({ idOwner: id }).select(
      "name createdAt state",
    );
    if (!events) {
      return NextResponse.json({ error: "Events not found" }, { status: 404 });
    }

    events = events.map((event, index) => ({
      ...event.toObject(),
      key: index,
    }));

    return NextResponse.json(
      { events: events, message: "Success" },
      { status: 202 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
