
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";
import { auth } from "../../../lib/auth";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 }
      );
    }

    const uri = process.env.MONGODB_URI;

    if (!uri) {
      return NextResponse.json(
        {
          success: false,
          message: "MongoDB URI is missing",
        },
        { status: 500 }
      );
    }

    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
    });

    try {
      await client.connect();

      const db = client.db(
        process.env.DB_NAME || "booknook"
      );

      const email = session.user.email
        .trim()
        .toLowerCase();

      const books = await db
        .collection("books")
        .find({ addedBy: email })
        .sort({ createdAt: -1 })
        .toArray();

      return NextResponse.json({
        success: true,
        books,
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("My Books Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load your books",
      },
      { status: 500 }
    );
  }
}
