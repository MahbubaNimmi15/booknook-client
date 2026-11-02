
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId, MongoClient } from "mongodb";
import { auth } from "../../../../lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function getDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing");
  }

  const client = new MongoClient(uri);
  await client.connect();

  return {
    client,
    db: client.db(process.env.DB_NAME || "booknook"),
  };
}

// PATCH - Edit own book
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "Please login first" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid book ID" },
      { status: 400 }
    );
  }

  let connection: Awaited<ReturnType<typeof getDatabase>> | undefined;

  try {
    const body = await request.json();

    const { title, author, category, image, description, quantity, rating } =
      body;

    if (
      [title, author, category, image, description].some(
        (value) => typeof value !== "string" || !value.trim()
      )
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const bookQuantity = Number(quantity);
    const bookRating = Number(rating);

    if (
      quantity === "" ||
      quantity === null ||
      quantity === undefined ||
      !Number.isInteger(bookQuantity) ||
      bookQuantity < 0 ||
      rating === "" ||
      rating === null ||
      rating === undefined ||
      !Number.isFinite(bookRating) ||
      bookRating < 0 ||
      bookRating > 5
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity or rating" },
        { status: 400 }
      );
    }

    connection = await getDatabase();

    const result = await connection.db.collection("books").updateOne(
      {
        _id: new ObjectId(id),
        addedBy: session.user.email.trim().toLowerCase(),
      },
      {
        $set: {
          title: title.trim(),
          author: author.trim(),
          category: category.trim(),
          image: image.trim(),
          description: description.trim(),
          quantity: bookQuantity,
          rating: bookRating,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { success: false, message: "Book not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Book updated successfully",
    });
  } catch (error) {
    console.error("Edit book error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update book" },
      { status: 500 }
    );
  } finally {
    await connection?.client.close();
  }
}

// DELETE - Delete own book
export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "Please login first" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid book ID" },
      { status: 400 }
    );
  }

  let connection: Awaited<ReturnType<typeof getDatabase>> | undefined;

  try {
    connection = await getDatabase();

    const result = await connection.db.collection("books").deleteOne({
      _id: new ObjectId(id),
      addedBy: session.user.email.trim().toLowerCase(),
    });

    if (!result.deletedCount) {
      return NextResponse.json(
        { success: false, message: "Book not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Delete book error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete book" },
      { status: 500 }
    );
  } finally {
    await connection?.client.close();
  }
}
