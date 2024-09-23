import { Scheda } from "@/lib/types";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const [db] = await connectToDatabase();
  const schedeCollection = db.collection("schede");
  const schedaDb = await schedeCollection.findOne(new ObjectId(id));
  if (!schedaDb)
    return NextResponse.json(
      {},
      { status: 404, statusText: "scheda non trovata" }
    );

  const scheda = {
    ...schedaDb,
    timeStamp: new Date(schedaDb.timeStamp),
  } as Scheda;

  return NextResponse.json(scheda);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const [db] = await connectToDatabase();
  const schedeCollection = db.collection("schede");
  const scheda = await request.json();
  scheda._id = new ObjectId(id);
  schedeCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: scheda }
  );
  return NextResponse.json({});
}
