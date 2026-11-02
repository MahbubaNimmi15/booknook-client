
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const auth = betterAuth({
  // Better Auth URL configuration
  baseURL: process.env.BETTER_AUTH_URL,

  // Allowed frontend origins
  trustedOrigins: [
    "http://localhost:3001",
  ],

  // MongoDB database connection
  database: mongodbAdapter(
    mongoClient.db("booknook"),
    {
      client: mongoClient,
    }
  ),

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  // User configuration
  user: {
    additionalFields: {},
  },
});

export { clientPromise };
