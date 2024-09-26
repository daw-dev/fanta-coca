import { getRisultati } from "@/lib/mongodb";
import SchedaPage from "./pageDetails";

export default async function SchedaOuterPage() {
  const staffs = (await getRisultati()).staffs.map(
    (staff) => staff.unita
  );
  return <SchedaPage staffs={staffs} />;
}
