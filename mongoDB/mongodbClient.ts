import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!DB_NAME) {
  throw new Error('Define the DB_NAME environmental variable');
}

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  if (MONGODB_URI) {
    let client = new MongoClient(MONGODB_URI, {});
    await client.connect();
    let db = client.db(DB_NAME);
    // set cache
    cachedClient = client;
    cachedDb = db;
  }

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
