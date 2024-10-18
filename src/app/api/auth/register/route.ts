import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
  } catch (error: any) {
    console.error(error.message);
  }
}
