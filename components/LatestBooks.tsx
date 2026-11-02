
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookCard, { type Book } from "./BookCard";

type DatabaseBook = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image?: string;
  quantity: number;
  createdAt?: string;
};

export default function LatestBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/books"
        );

        if (!response.ok) {
          throw new Error("Failed to load books");
        }

        const data = await response.json();

        if (!data.success || !Array.isArray(data.books)) {
          throw new Error("Invalid books response");
        }

        const latest = [...(data.books as DatabaseBook[])]
          .sort((a, b) => {
            const dateA = a.createdAt
              ? new Date(a.createdAt).getTime()
              : 0;
            const dateB = b.createdAt
              ? new Date(b.createdAt).getTime()
              : 0;

            if (dateA !== dateB) return dateB - dateA;

            return b._id.localeCompare(a._id);
          })
          .slice(0, 6)
          .map((book) => ({
            id: book._id,
            title: book.title,
            author: book.author,
            category: book.category,
            image: book.image || "",
            availableCopies: book.quantity ?? 0,
          }));

        setBooks(latest);
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

    loadBooks();
  }, []);

  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-semibold uppercase tracking-widest text-indigo-600">
              Explore Our Collection
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Latest Books
            </h2>

            <p className="mt-3 text-slate-600">
              Discover the newest books in our library.
            </p>
          </div>

          <Link
            href="/books"
            className="rounded-lg border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
          >
            View All Books
          </Link>
        </div>

        {loading && (
          <p className="py-10 text-center text-slate-600">
            Loading latest books...
          </p>
        )}

        {error && (
          <p className="py-10 text-center text-red-600">
            {error}. Make sure the backend is running.
          </p>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="py-10 text-center text-slate-600">
            No books available yet.
          </p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
