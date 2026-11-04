
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const requestHeaders = await headers();

    // Verify logged-in user
    const session = await auth.api.getSession({
      headers: requestHeaders,
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

    // Get JWT from Better Auth
    const tokenResponse = await auth.api.getToken({
      headers: requestHeaders,
    });

    const token = tokenResponse?.token;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to generate JWT token",
        },
        { status: 401 }
      );
    }

    // Validate borrow ID
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

    // Backend configuration
    const backendURL =
      process.env.BACKEND_URL ||
      "http://localhost:5000";

    // Send JWT to Express backend
    const response = await fetch(
      `${backendURL}/api/return`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
