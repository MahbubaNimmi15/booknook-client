
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [saving, setSaving] = useState(false);

  async function loadBooks() {
    try {
      setError("");
      const response = await fetch("/api/my-books", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load books");
      }

      const data = await response.json();
      setBooks(data.books || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function updateBook() {
    if (!editing) return;

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/books/${editing._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update book");
      }

      setEditing(null);
      setMessage("Book updated successfully!");
      await loadBooks();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Update failed"
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteBook() {
    if (!deleting) return;

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/books/${deleting._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete book");
      }

      setDeleting(null);
      setMessage("Book deleted successfully!");
      await loadBooks();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Delete failed"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">My Books</h1>
      <p className="mb-6 text-gray-500">
        Manage the books you have added to BookNook.
      </p>

      {message && (
        <p className="mb-4 rounded-lg bg-green-100 p-3 text-green-800">
          {message}
        </p>
      )}

      {error && (
        <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-800">
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading your books...</p>
      ) : books.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="mb-4">You have not added any books yet.</p>
          <Link href="/add-book" className="text-orange-600">
            Add Book
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div key={book._id} className="rounded-xl border p-5">
              <img
                src={book.image}
                alt={book.title}
                className="mb-4 h-64 w-full object-cover"
              />

              <h2 className="text-xl font-bold">{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>
              <p>Copies: {book.quantity}</p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setError("");
                    setEditing(book);
                  }}
                  className="rounded-lg bg-orange-500 px-4 py-2 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setError("");
                    setDeleting(book);
                  }}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 text-gray-900">
            <h2 className="mb-4 text-2xl font-bold">Edit Book</h2>

            {(
              [
                "title",
                "author",
                "category",
                "image",
                "description",
                "quantity",
                "rating",
              ] as const
            ).map((field) => (
              <label key={field} className="mb-3 block">
                <span className="mb-1 block capitalize">{field}</span>
                <input
                  type={field === "quantity" || field === "rating" ? "number" : "text"}
                  value={editing[field] ?? ""}
                  onChange={(event) =>
                    setEditing({
                      ...editing,
                      [field]:
                        field === "quantity" || field === "rating"
                          ? Number(event.target.value)
                          : event.target.value,
                    })
                  }
                  className="w-full rounded-lg border p-2"
                />
              </label>
            ))}

            <div className="mt-5 flex gap-3">
              <button
                onClick={updateBook}
                disabled={saving}
                className="rounded-lg bg-orange-500 px-4 py-2 text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setEditing(null)}
                disabled={saving}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 text-gray-900">
            <h2 className="mb-3 text-2xl font-bold">Delete Book?</h2>
            <p className="mb-5">
              Are you sure you want to delete{" "}
              <strong>{deleting.title}</strong>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={deleteBook}
                disabled={saving}
                className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50"
              >
                {saving ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setDeleting(null)}
                disabled={saving}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
