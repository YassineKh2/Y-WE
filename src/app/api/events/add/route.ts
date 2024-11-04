import { NextResponse } from "next/server";
import Event from "@/models/Event";
import connectMongoDB from "@/lib/MongodbClient";
import { AddEvent } from "@/lib/ZodSchemas";
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
    FormData.idOwner = id;

    console.log(FormData);

    try {
      AddEvent.safeParse(FormData);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const {
      idOwner,
      name,
      startDate,
      endDate,
      estimatedAttendees,
      askedAmount,
      description,
      location,
      type,
    } = FormData;

    await connectMongoDB();

    await Event.create({
      idOwner,
      name,
      startDate,
      endDate,
      estimatedAttendees,
      askedAmount,
      description,
      location,
      type,
    });

    return NextResponse.json(
      { success: "Event created successfully" },
      { status: 202 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
