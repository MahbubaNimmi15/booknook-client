
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Check logged-in user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to return a book",
        },
        { status: 401 }
      );
    }

    // Read borrow ID
    const body = await request.json();
    const borrowId = body?.borrowId;

    if (
      typeof borrowId !== "string" ||
      !/^[a-fA-F0-9]{24}$/.test(borrowId)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid borrow ID is required",
        },
        { status: 400 }
      );
    }

    // Read private server-side key
    const apiSecret = process.env.INTERNAL_API_SECRET;

    if (!apiSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Server security configuration is missing",
        },
        { status: 500 }
      );
    }

    // Send return request to Express backend
    const response = await fetch(
      "http://localhost:5000/api/return",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-api-key": apiSecret,
        },
        body: JSON.stringify({
          borrowId,
          userEmail: session.user.email,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Return API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to return book",
      },
      { status: 500 }
    );
  }
}
