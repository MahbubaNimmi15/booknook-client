
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  "https://booknook-server-gold.vercel.app";

export async function POST(request: Request) {
  try {
    const requestHeaders = await headers();

    // Verify the current user using Better Auth
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

    // Validate the borrow ID
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

    // Server-side internal API authentication
    const internalApiSecret =
      process.env.INTERNAL_API_SECRET;

    if (!internalApiSecret) {
      console.error("INTERNAL_API_SECRET is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Server authentication configuration error",
        },
        { status: 500 }
      );
    }

    // Forward request securely to Express backend
    const response = await fetch(
      `${BACKEND_URL.replace(/\/+$/, "")}/api/return`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-api-key": internalApiSecret,
        },
        body: JSON.stringify({
          borrowId,
          userEmail: session.user.email,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Return request failed:", {
        status: response.status,
        message: data.message,
      });
    }

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
