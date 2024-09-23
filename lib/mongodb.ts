import { Risultato } from "@/lib/types";
import { Db, MongoClient } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<[Db, MongoClient]> {
  if (cachedClient && cachedDb) {
    return [cachedDb, cachedClient];
  }

  cachedClient = await new MongoClient(process.env.MONGODB_URL!).connect();
  cachedDb = cachedClient.db("fanta-coca");

  return [cachedDb, cachedClient];
}

export async function getRisultatiUltimaEdizione(){
  const schedeCollection = await getRisultati();
  const risultatoFromDb = (
    await schedeCollection.find().sort({ availableFrom: -1 }).limit(1).toArray()
  )[0];
  const risultato: Risultato = {
    availableFrom: new Date(risultatoFromDb.availableFrom),
    staffs: risultatoFromDb.staffs,
  };
  return risultato;
}

export async function getRisultati() {
  const [db] = await connectToDatabase();
  const schedeCollection = db.collection("risultati");
  return schedeCollection;
}
