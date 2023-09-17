import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  console.log(req);

  return NextResponse.json({
    message: "Hello World from API!",
  });
}