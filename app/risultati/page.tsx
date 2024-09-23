import { connectToDatabase, getRisultatiUltimaEdizione } from "@/lib/mongodb";
import { Staff } from "@/lib/types";
import Link from "next/link";

export default async function Risultati() {
  const risultato = await getRisultatiUltimaEdizione();
  const today = new Date();
  if (
    today < risultato.availableFrom &&
    today.getFullYear() === risultato.availableFrom.getFullYear()
  ) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-20">
        <span className="text-xl md:text-3xl lg:text-5xl">
          I risultati non sono ancora disponibili!
        </span>
        <Link href="/" className="cool-button">
          Indietro
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-5 w-screen p-8">
      <span className="text-3xl w-full text-center">Risultati</span>
      <div className="w-full grid auto-rows-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-center gap-5">
        {risultato.staffs.map((staff, index) => (
          <StaffViewer key={index} staff={staff} />
        ))}
      </div>
      <Link href="/" className="cool-button">
        Indietro
      </Link>
    </div>
  );
}

interface StaffViewerProps {
  staff: Staff;
}

function StaffViewer(props: StaffViewerProps) {
  return (
    <div className="flex flex-col gap-3 w-full text-center items-center bg-white bg-opacity-10 py-5 px-3 h-full justify-center rounded-md">
      <span className="text-xl">{props.staff.nomeStaff}</span>
      {props.staff.capi.map((capo, index) => (
        <input
          className="p-2 w-full max-w-80 bg-white text-black rounded-sm hover:rounded-lg transition-[border-radius]"
          key={index}
          value={capo}
          disabled
        />
      ))}
    </div>
  );
}
