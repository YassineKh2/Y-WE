import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export async function middleware(request: Request) {
  return NextResponse.next();
}
