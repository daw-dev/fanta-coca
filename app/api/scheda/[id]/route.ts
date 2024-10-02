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

  return NextResponse.json(schedaDb);
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
  scheda.lastModified = new Date(scheda.lastModified);
  schedeCollection.updateOne({ _id: new ObjectId(id) }, { $set: scheda });
  return NextResponse.json({});
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const [db] = await connectToDatabase();
  const schedeCollection = db.collection("schede");
  return NextResponse.json(
    await schedeCollection.deleteOne({ _id: new ObjectId(id) })
  );
}
