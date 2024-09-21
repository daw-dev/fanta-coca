import { connectToDatabase } from "@/lib/mongodb";
import Link from "next/link";
import { StaffGuess } from "../scheda/page";

interface Risultato {
  availableFrom: Date;
  staffs: StaffGuess[];
}

export default async function Risultati() {
  const [db] = await connectToDatabase();
  const schedeCollection = db.collection("risultati");
  const risultatoFromDb = (
    await schedeCollection.find().sort({ availableFrom: -1 }).limit(1).toArray()
  )[0];
  const risultato: Risultato = {
    availableFrom: new Date(risultatoFromDb.availableFrom),
    staffs: risultatoFromDb.staffs,
  };
  if (new Date() < risultato.availableFrom) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-20">
        <span className="text-xl md:text-3xl lg:text-5xl">
          I risultati non sono ancora disponibili!
        </span>
        <Link
          href="/"
          className="cool-button"
        >
          Indietro
        </Link>
      </div>
    );
  }
  return <div>{JSON.stringify(risultato)}</div>;
}
