import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const feedback = await request.json();
  const [db] = await connectToDatabase();
  return NextResponse.json(await db.collection("feedback").insertOne({feedback, timeStamp: new Date()}));
}
