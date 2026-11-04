
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  quantity: number;
  rating: number;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://booknook-server-gold.vercel.app";

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/api/books`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load books.");
        }

        const data = await response.json();

        if (!data.success || !Array.isArray(data.books)) {
          throw new Error("Invalid books data.");
        }

        setBooks(data.books);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => controller.abort();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              All Books
            </h1>

            <p className="mt-3 text-slate-600">
              Explore books from our library collection.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col items-center justify-center gap-4 py-20"
            >
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

              <p className="font-medium text-slate-600">
                Loading books...
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div
              role="alert"
              className="mx-auto max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center"
            >
              <h2 className="font-bold text-red-700">
                Unable to load books
              </h2>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && books.length === 0 && (
            <div className="py-20 text-center">
              <h2 className="text-xl font-bold text-slate-800">
                No Books Available
              </h2>

              <p className="mt-2 text-slate-500">
                New books will appear here soon.
              </p>
            </div>
          )}

          {/* Books Grid */}
          {!loading && !error && books.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <article
                  key={book._id}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={book.image || "/placeholder.png"}
                    alt={book.title}
                    className="h-64 w-full bg-slate-100 object-cover"
                    loading="lazy"
                  />

                  <div className="flex flex-1 flex-col space-y-3 p-5">
                    <h2 className="line-clamp-2 text-xl font-bold text-slate-900">
                      {book.title}
                    </h2>

                    <p className="text-slate-600">
                      By {book.author}
                    </p>

                    <p className="text-sm font-medium text-indigo-600">
                      {book.category}
                    </p>

                    <div className="flex flex-wrap justify-between gap-2 text-sm text-slate-700">
                      <span>
                        ⭐ {book.rating}
                      </span>

                      <span>
                        Available: {book.quantity}
                      </span>
                    </div>

                    <div className="flex-1" />

                    <Link
                      href={`/books/${book._id}`}
                      className="block rounded-lg bg-indigo-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
