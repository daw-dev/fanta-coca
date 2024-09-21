import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Scheda } from "../page";
import Link from "next/link";

export default async function SchedaPage(props: { params: { id: string } }) {
  const { id } = props.params;

  const [db] = await connectToDatabase();
  const schedeCollection = db.collection("schede");
  const scheda = (await schedeCollection.findOne(
    new ObjectId(id)
  )) as unknown as Scheda;

  return (
    <div className="flex flex-col items-center gap-3 w-screen p-8">
      <span className="text-3xl w-full text-center">
        Scheda di {scheda.nome}
      </span>
      <div className="w-full grid auto-rows-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-center gap-y-5 gap-x-10">
        {scheda.guesses.map((guess, index) => (
          <Staff key={index} nomeStaff={guess.nomeStaff} capi={guess.capi} />
        ))}
      </div>
      <Link href="/" className="cool-button">
        Indietro
      </Link>
    </div>
  );
}

interface StaffProps {
  nomeStaff: string;
  capi: string[];
}

function Staff(props: StaffProps) {
  return (
    <div className="flex flex-col gap-3 w-full text-center items-center bg-white bg-opacity-10 py-10 px-5 h-full justify-center rounded-md">
      <span className="text-xl">{props.nomeStaff}</span>
      {props.capi.map((capo, index) => (
        <input
          className="text-center p-2 w-full max-w-80 bg-white text-black rounded-sm hover:rounded-lg transition-[border-radius]"
          key={index}
          value={capo}
          disabled
        />
      ))}
    </div>
  );
}
