import { getRisultatiUltimaEdizione } from "@/lib/mongodb";
import SchedaPage from "./pageDetails";

export default async function SchedaOuterPage() {
  const staffs = (await getRisultatiUltimaEdizione()).staffs.map(
    (staff) => staff.nomeStaff
  );
  return <SchedaPage staffs={staffs} />;
}
