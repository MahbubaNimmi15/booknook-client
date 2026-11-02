
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

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/books"
        );

        if (!response.ok) {
          throw new Error("Failed to load books");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error("Failed to load books");
        }

        setBooks(data.books);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              All Books
            </h1>
            <p className="mt-3 text-gray-600">
              Explore books from our library collection.
            </p>
          </div>

          {loading && (
            <p className="text-center text-gray-600">
              Loading books...
            </p>
          )}

          {error && (
            <p className="text-center text-red-600">
              {error}
            </p>
          )}

          {!loading && !error && books.length === 0 && (
            <p className="text-center text-gray-600">
              No books available yet.
            </p>
          )}

          {!loading && !error && books.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-64 w-full object-cover"
                  />

                  <div className="space-y-3 p-5">
                    <h2 className="text-xl font-bold text-gray-900">
                      {book.title}
                    </h2>

                    <p className="text-gray-600">
                      By {book.author}
                    </p>

                    <p className="text-sm text-indigo-600">
                      {book.category}
                    </p>

                    <div className="flex justify-between text-sm text-gray-700">
                      <span>⭐ {book.rating}</span>
                      <span>Available: {book.quantity}</span>
                    </div>

                    <Link
                      href={`/books/${book._id}`}
                      className="block rounded-lg bg-indigo-600 px-4 py-2 text-center font-semibold text-white hover:bg-indigo-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
