
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";
import { auth } from "../../../lib/auth";

export async function GET() {
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
        message: "Database configuration missing",
      },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(process.env.DB_NAME || "booknook");
    const email = session.user.email.trim().toLowerCase();

    const borrows = await db
      .collection("borrows")
      .find({
        userEmail: email,
        status: "borrowed",
      })
      .sort({ borrowDate: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      borrows,
    });
  } catch (error) {
    console.error("My Borrows API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load borrowed books",
      },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
