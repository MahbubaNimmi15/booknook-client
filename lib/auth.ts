
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing");
}

const mongoClient = new MongoClient(mongoUri, {
  serverSelectionTimeoutMS: 10000,
});

const clientPromise = mongoClient.connect();

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",

  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://booknook-client-zbaq.vercel.app",
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

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },

  plugins: [jwt()],
});

export { clientPromise };
