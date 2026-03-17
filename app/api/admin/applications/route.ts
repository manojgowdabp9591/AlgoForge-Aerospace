import { NextResponse } from "next/server";

export async function GET() {

  const mockApplications: any[] = [
   
  ];

  return NextResponse.json(mockApplications);
}
