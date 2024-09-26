import { getRisultati } from "@/lib/mongodb";
import SchedaPage from "./pageDetails";

export default async function SchedaOuterPage() {
  const risultati = await getRisultati();
  if (!risultati) {
    return (
      <div>
        <span>Non è stato possibile caricare le staff</span>
      </div>
    );
  }
  const staffs = risultati.staffs.map((staff) => staff.unita);
  return <SchedaPage staffs={staffs} />;
}
