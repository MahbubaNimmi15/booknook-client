
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [form, setForm] = useState({
    title: "Deep Work",
    author: "Cal Newport",
    category: "Other",
    image:
      "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    description:
      "Deep Work is a productivity book by Cal Newport that explains how focused, distraction-free work can help people achieve better results. It provides practical strategies for improving concentration, managing time, and developing valuable skills.",
    quantity: "7",
    rating: "4.7",
  });

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const response = await fetch(
          "/api/auth/get-session",
          {
            credentials: "same-origin",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Session check failed");
        }

        const session = await response.json();

        if (!active) return;

        if (!session?.user?.email) {
          router.replace(
            "/login?callbackUrl=%2Fadd-book"
          );
          return;
        }

        setCheckingAuth(false);
      } catch {
        if (active) {
          router.replace(
            "/login?callbackUrl=%2Fadd-book"
          );
        }
      }
    }

    checkAuth();

    return () => {
      active = false;
    };
  }, [router]);

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading || checkingAuth) return;

    setLoading(true);
    setMessage("");
    setIsError(false);

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      15000
    );

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        signal: controller.signal,
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          rating: Number(form.rating),
        }),
      });

      const responseText = await response.text();

      let data: {
        success?: boolean;
        message?: string;
      };

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Server response error (${response.status})`
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to add book"
        );
      }

      setMessage("Book added successfully!");
      setIsError(false);

      router.push("/my-books");
      router.refresh();
    } catch (error) {
      setIsError(true);

      if (
        error instanceof Error &&
        error.name === "AbortError"
      ) {
        setMessage(
          "Request timed out. Check My Books before trying again."
        );
      } else {
        setMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      }
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  const inputStyle =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-orange-500 focus:outline-none";

  if (checkingAuth) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">
          Checking login...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">
        Add New Book
      </h1>

      <p className="mb-8 mt-2 text-gray-500">
        Share a book with the BookNook community.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block font-medium">
            Book Title
          </label>
          <input
            required
            className={inputStyle}
            value={form.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Author Name
          </label>
          <input
            required
            className={inputStyle}
            value={form.author}
            onChange={(e) =>
              updateField("author", e.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>
          <select
            className={inputStyle}
            value={form.category}
            onChange={(e) =>
              updateField("category", e.target.value)
            }
          >
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Kids">Kids</option>
            <option value="Other">Other</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Book Image URL
          </label>
          <input
            required
            type="url"
            className={inputStyle}
            value={form.image}
            onChange={(e) =>
              updateField("image", e.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Short Description
          </label>
          <textarea
            required
            rows={4}
            className={inputStyle}
            value={form.description}
            onChange={(e) =>
              updateField("description", e.target.value)
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Total Copies
            </label>
            <input
              required
              type="number"
              min="0"
              className={inputStyle}
              value={form.quantity}
              onChange={(e) =>
                updateField("quantity", e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Rating (0–5)
            </label>
            <input
              required
              type="number"
              min="0"
              max="5"
              step="0.1"
              className={inputStyle}
              value={form.rating}
              onChange={(e) =>
                updateField("rating", e.target.value)
              }
            />
          </div>
        </div>

        {message && (
          <div
            role="alert"
            className={`rounded-lg p-3 ${
              isError
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>
      </form>
    </main>
  );
}
