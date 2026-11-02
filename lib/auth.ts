
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const auth = betterAuth({
  baseURL: "http://localhost:3002",

  trustedOrigins: [
    "http://localhost:3001",
    "http://localhost:3002",
  ],

  database: mongodbAdapter(
    mongoClient.db("booknook"),
    {
      client: mongoClient,
    }
  ),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  user: {
    additionalFields: {},
  },
});

export { clientPromise };
