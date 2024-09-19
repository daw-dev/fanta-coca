import { connectToDatabase } from "@/lib/mongodb";

export default async function Risultati() {
  const [db] = await connectToDatabase();
  const schedeCollection = db.collection("schede");
  const schede = await schedeCollection.find().toArray();
  return (
    <div>
      {
        JSON.stringify(schede)
      }
    </div>
  )
}
