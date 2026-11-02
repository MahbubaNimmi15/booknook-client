
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "Please login first" },
      { status: 401 }
    );
  }

  let body: { bookId?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }

  const bookId = body.bookId;

  if (!bookId || !ObjectId.isValid(bookId)) {
    return NextResponse.json(
      { success: false, message: "Invalid book ID" },
      { status: 400 }
    );
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json(
      { success: false, message: "Database configuration missing" },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri);
  const email = session.user.email.trim().toLowerCase();

  try {
    await client.connect();

    const db = client.db(process.env.DB_NAME || "booknook");
    const books = db.collection("books");
    const borrows = db.collection("borrows");
    const id = new ObjectId(bookId);

    // Prevent borrowing the same book twice
    const existingBorrow = await borrows.findOne({
      bookId,
      userEmail: email,
      status: "borrowed",
    });

    if (existingBorrow) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already borrowed this book",
        },
        { status: 400 }
      );
    }

    // Reduce available quantity only when stock exists
    const result = await books.findOneAndUpdate(
      {
        _id: id,
        quantity: { $gt: 0 },
      },
      {
        $inc: { quantity: -1 },
      },
      {
        returnDocument: "before",
      }
    );

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found or out of stock",
        },
        { status: 400 }
      );
    }

    const borrowDate = new Date();

    try {
      await borrows.insertOne({
        bookId,
        bookTitle: result.title,
        bookImage: result.image,
        userEmail: email,
        userName: session.user.name || "",
        borrowDate,
        returnDate: null,
        status: "borrowed",
      });
    } catch (error) {
      // Restore quantity if saving borrow record fails
      await books.updateOne(
        { _id: id },
        { $inc: { quantity: 1 } }
      );

      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Book borrowed successfully",
    });
  } catch (error) {
    console.error("Borrow API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to borrow book",
      },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
