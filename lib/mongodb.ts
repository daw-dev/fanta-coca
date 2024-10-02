import { CoCa } from "@/lib/types";
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

export async function getRisultati() {
  const [db] = await connectToDatabase();
  const staffCollection = db.collection("staff");
  const twoMonthAgo = new Date();
  twoMonthAgo.setMonth(twoMonthAgo.getMonth() - 2);
  const risultatoFromDb = await staffCollection.findOne({
    passaggi: { $gte: twoMonthAgo },
  });
  if (!risultatoFromDb) {
    return null;
  }
  const risultato: CoCa = {
    passaggi: risultatoFromDb.passaggi,
    staffs: risultatoFromDb.staffs,
  };
  return risultato;
}

export async function getStaffPrecedenti() {
  const [db] = await connectToDatabase();
  const staffCollection = db.collection("staff");
  const today = new Date();
  const risultatoFromDb = await staffCollection
    .find({
      passaggi: { $lt: today },
    })
    .sort({ passaggi: -1 })
    .toArray();
  if (!risultatoFromDb) {
    return null;
  }
  return risultatoFromDb.map(
    (risultato) =>
      ({
        passaggi: new Date(risultato.passaggi),
        staffs: risultato.staffs,
      } as CoCa)
  );
}
