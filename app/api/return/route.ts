
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://booknook-server-gold.vercel.app";

export async function POST(request: Request) {
  try {
    // Get current logged-in user
    const requestHeaders = await headers();

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

    // Generate JWT token using Better Auth
    const tokenResponse = await auth.api.getToken({
      headers: requestHeaders,
    });

    const token = tokenResponse?.token;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to generate authentication token",
        },
        { status: 401 }
      );
    }

    // Forward return request to Express backend
    const response = await fetch(
      `${BACKEND_URL.replace(/\/+$/, "")}/api/return`,
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

    if (!response.ok) {
      console.error("Backend return request failed:", {
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
