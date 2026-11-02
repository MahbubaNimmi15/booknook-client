
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";
import { auth } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Check user login
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

    // Read form data
    const body = await request.json();

    const {
      title,
      author,
      category,
      image,
      description,
      quantity,
      rating,
    } = body;

    // Validate required fields
    if (
      [title, author, category, image, description].some(
        (value) =>
          typeof value !== "string" ||
          !value.trim()
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields",
        },
        { status: 400 }
      );
    }

    const bookQuantity = Number(quantity);
    const bookRating = Number(rating);

    if (
      quantity === undefined ||
      quantity === null ||
      quantity === "" ||
      !Number.isInteger(bookQuantity) ||
      bookQuantity < 0 ||
      !Number.isFinite(bookRating) ||
      bookRating < 0 ||
      bookRating > 5
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid quantity or rating",
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      return NextResponse.json(
        {
          success: false,
          message: "MongoDB configuration is missing",
        },
        { status: 500 }
      );
    }

    const client = new MongoClient(uri);

    try {
      await client.connect();

      const db = client.db("booknook");

      // Save book with logged-in user
      const newBook = {
        title: title.trim(),
        author: author.trim(),
        category: category.trim(),
        image: image.trim(),
        description: description.trim(),
        quantity: bookQuantity,
        rating: bookRating,
        addedBy: session.user.email.trim().toLowerCase(),
        createdAt: new Date(),
      };

      const result = await db
        .collection("books")
        .insertOne(newBook);

      return NextResponse.json(
        {
          success: true,
          message: "Book added successfully",
          insertedId: result.insertedId.toString(),
        },
        { status: 201 }
      );
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Add Book Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add book. Please try again.",
      },
      { status: 500 }
    );
  }
}

