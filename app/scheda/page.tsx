import { connectToDatabase } from "@/lib/mongodb";
import SchedaPage from "./pageDetails";
import { redirect } from "next/navigation";

export interface Scheda {
  timeStamp: Date;
  nome: string;
  guesses: StaffGuess[];
}

export interface StaffGuess {
  nomeStaff: string;
  capi: string[];
}

export default async function SchedaOuterPage() {
  const [db] = await connectToDatabase();
  const staffs = await db
    .collection("staff")
    .find()
    .map((staff) => staff.name)
    .toArray();
  return <SchedaPage staffs={staffs} />
}
