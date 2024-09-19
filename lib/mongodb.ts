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
