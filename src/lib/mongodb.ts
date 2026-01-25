import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGO_URI) {
  throw new Error('Please add your MONGO_URI to .env file');
}

const uri = process.env.MONGO_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the client across module reloads
  // caused by HMR (Hot Module Replacement)
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a separate module,
// the client can be shared across functions.
export default clientPromise;

// Helper function to get database
export async function getDatabase(dbName?: string): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

// Helper function to close connection (useful for serverless cleanup)
export async function closeConnection(): Promise<void> {
  const client = await clientPromise;
  await client.close();
}
