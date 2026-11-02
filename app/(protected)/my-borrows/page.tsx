
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Borrow = {
  _id: string;
  bookId?: string;
  bookTitle?: string;
  bookImage?: string;
  title?: string;
  image?: string;
  borrowDate?: string;
  borrowedAt?: string;
  createdAt?: string;
  status?: string;
};

function formatDate(value?: string) {
  if (!value) return "Date not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date not available";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function BookCover({
  src,
  title,
}: {
  src?: string;
  title: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div className="flex h-56 w-full items-center justify-center bg-indigo-50 px-6 text-center">
        <div>
          <div className="mb-3 text-5xl">📚</div>
          <p className="font-semibold text-indigo-800">
            {title}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Book cover unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      loading="lazy"
      className="h-56 w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export default function MyBorrowsPage() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [returningId, setReturningId] = useState<string | null>(null);

  const loadBorrows = useCallback(async () => {
    try {
      setError("");

      const response = await fetch("/api/my-borrows", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load borrowed books"
        );
      }

      setBorrows(
        Array.isArray(data.borrows) ? data.borrows : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load borrowed books"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBorrows();
  }, [loadBorrows]);

  async function handleReturn(borrowId: string) {
    if (returningId) return;

    setReturningId(borrowId);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ borrowId }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to return book"
        );
      }

      setMessage("Book returned successfully!");
      await loadBorrows();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to return book"
      );
    } finally {
      setReturningId(null);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Borrows
          </h1>
          <p className="mt-2 text-gray-600">
            View and return your borrowed books.
          </p>
        </div>

        {message && (
          <div
            role="status"
            className="mb-6 rounded-lg bg-green-50 p-4 text-green-700"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg bg-red-50 p-4 text-red-700"
          >
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-600">
            Loading borrowed books...
          </p>
        ) : borrows.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No Borrowed Books
            </h2>
            <p className="mt-3 text-gray-600">
              You have no active borrowed books.
            </p>
            <Link
              href="/books"
              className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {borrows.map((borrow) => {
              const title =
                borrow.bookTitle ||
                borrow.title ||
                "Book title unavailable";

              const cover =
                borrow.bookImage || borrow.image;

              const date =
                borrow.borrowDate ||
                borrow.borrowedAt ||
                borrow.createdAt;

              return (
                <div
                  key={borrow._id}
                  className="overflow-hidden rounded-xl bg-white shadow-md"
                >
                  <BookCover
                    src={cover}
                    title={title}
                  />

                  <div className="space-y-3 p-5">
                    <h2 className="text-xl font-bold text-gray-900">
                      {title}
                    </h2>

                    <p className="text-gray-600">
                      Borrow Date: {formatDate(date)}
                    </p>

                    <p className="text-gray-600">
                      Status:{" "}
                      <span className="font-semibold text-indigo-600">
                        {borrow.status || "Borrowed"}
                      </span>
                    </p>

                    <button
                      type="button"
                      disabled={returningId !== null}
                      onClick={() =>
                        handleReturn(borrow._id)
                      }
                      className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {returningId === borrow._id
                        ? "Returning..."
                        : "Return Book"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
