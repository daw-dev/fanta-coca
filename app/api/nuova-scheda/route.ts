import { NextRequest, NextResponse } from "next/server";
import schemaScheda from "@/utils/schema-scheda.json";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { connectToDatabase } from "@/lib/mongodb";
import { Scheda } from "@/lib/types";

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(schemaScheda);

export async function POST(request: NextRequest) {
  const scheda = await request.json();
  const isValid = validate(scheda);

  if (!isValid)
    return NextResponse.json(
      { message: "the body has not a valid structure" },
      { status: 400 }
    );
  
  const validScheda = scheda as Scheda;
  
  const [db] = await connectToDatabase();
  return NextResponse.json(await db.collection("schede").insertOne(validScheda));
}
