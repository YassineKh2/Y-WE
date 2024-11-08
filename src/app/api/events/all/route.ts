import { NextResponse } from "next/server";
import Event from "@/models/Event";
import connectMongoDB from "@/lib/MongodbClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/models/User";
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    //@ts-ignore
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    //@ts-ignore

    await connectMongoDB();

    let events = await Event.find().select(
      "_id name createdAt state askedAmount startDate endDate idOwner location estimatedAttendees description type",
    );
    if (!events) {
      return NextResponse.json({ error: "Events not found" }, { status: 404 });
    }

    const userIds = events.map((event) => event.idOwner);
    const users = await User.find({ _id: { $in: userIds } }).select(
      "name email image",
    );

    const userMap = users.reduce((acc, user) => {
      acc[user._id] = user;
      return acc;
    }, {});

    events = events.map((event, index) => ({
      ...event.toObject(),
      key: index,
      ownerName: userMap[event.idOwner]?.name,
      ownerEmail: userMap[event.idOwner]?.email,
      ownerImage: userMap[event.idOwner]?.image,
    }));

    return NextResponse.json(
      { events: events, message: "Success" },
      { status: 202 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
