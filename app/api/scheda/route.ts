import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Scheda } from "@/lib/types";
import { MongoServerError } from "mongodb";

export async function POST(request: NextRequest) {
  const scheda = await request.json();

  const validScheda: Scheda = {
    nome: scheda.nome,
    staffs: scheda.staffs,
    lastModified: new Date(scheda.lastModified),
  };

  const [db] = await connectToDatabase();
  try{
    return NextResponse.json(
      await db.collection("schede").insertOne(validScheda)
    );
  }  catch(e){
    const error = e as MongoServerError;
    return NextResponse.json(error.errorResponse.errInfo!.details, { status: 400 });
  }
}
