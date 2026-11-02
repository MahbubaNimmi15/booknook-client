
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../../components/Navbar";

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

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [borrowing, setBorrowing] = useState(false);
  const [borrowMessage, setBorrowMessage] = useState("");
  const [borrowSuccess, setBorrowSuccess] = useState(false);

  useEffect(() => {
    async function loadBook() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/books/${id}`,
          { cache: "no-store" }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Book not found");
        }

        setBook(data.book);
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

    if (id) loadBook();
  }, [id]);

  async function handleBorrow() {
    if (!book || borrowing || book.quantity <= 0) {
      return;
    }

    setBorrowing(true);
    setBorrowMessage("");
    setBorrowSuccess(false);

    try {
      const response = await fetch("/api/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to borrow book"
        );
      }

      setBorrowSuccess(true);
      setBorrowMessage("Book borrowed successfully!");

      // Update available copies after successful borrow
      setBook((previousBook) =>
        previousBook
          ? {
              ...previousBook,
              quantity: Math.max(
                0,
                previousBook.quantity - 1
              ),
            }
          : null
      );
    } catch (err) {
      setBorrowSuccess(false);
      setBorrowMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setBorrowing(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => router.push("/books")}
            className="mb-8 text-indigo-600 hover:underline"
          >
            ← Back to All Books
          </button>

          {loading && (
            <p>Loading book details...</p>
          )}

          {error && (
            <p className="text-red-600">{error}</p>
          )}

          {!loading && !error && book && (
            <div className="grid gap-8 rounded-xl bg-white p-8 shadow-md md:grid-cols-2">
              <img
                src={book.image}
                alt={book.title}
                className="w-full rounded-lg object-cover"
              />

              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {book.title}
                </h1>

                <p className="text-gray-700">
                  Author: {book.author}
                </p>

                <p className="text-gray-700">
                  Category: {book.category}
                </p>

                <p className="text-gray-700">
                  Rating: ⭐ {book.rating}/5
                </p>

                <p className="text-gray-700">
                  Available Copies: {book.quantity}
                </p>

                <p className="text-gray-600">
                  {book.description}
                </p>

                <button
                  onClick={handleBorrow}
                  disabled={
                    borrowing ||
                    book.quantity <= 0 ||
                    borrowSuccess
                  }
                  className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {borrowing
                    ? "Borrowing..."
                    : borrowSuccess
                    ? "Borrowed Successfully"
                    : book.quantity <= 0
                    ? "Out of Stock"
                    : "Borrow Book"}
                </button>

                {borrowMessage && (
                  <p
                    role="status"
                    className={
                      borrowSuccess
                        ? "font-medium text-green-600"
                        : "font-medium text-red-600"
                    }
                  >
                    {borrowMessage}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
