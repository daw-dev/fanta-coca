import { getStaffPrecedenti } from "@/lib/mongodb";
import { CoCa } from "@/lib/types";

export default async function StaffPrecedenti() {
  const staffPrecedenti = await getStaffPrecedenti();
  if(!staffPrecedenti) {
    return (
      <div>
        <span>C&apos;è stato un problema con il caricamento delle staff precedenti</span>
      </div>
    );
  }
  return (
    <div>
      <span>Staff Precedenti</span>
      {
        staffPrecedenti.map((staff, index) => (
          <SimpleCoCaViewer key={index} staffs={staff} />
        ))
      }
    </div>
  );
}

interface SimpleCoCaViewerProps {
  staffs: CoCa;
}

function SimpleCoCaViewer(props: SimpleCoCaViewerProps) {
  return (
    <div>
      <span>CoCa anno {props.staffs.passaggi.getFullYear()}</span>
    </div>
  );
}