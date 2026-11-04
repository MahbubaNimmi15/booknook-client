
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-6 text-8xl font-extrabold tracking-tight text-indigo-600 sm:text-9xl">
            404
          </div>

          <div className="mb-6 text-6xl">📚</div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Oops! Page Not Found
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Looks like this page is missing from our library.
            Don&apos;t worry, there are plenty of great books
            waiting for you!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Back to Home
            </Link>

            <Link
              href="/books"
              className="rounded-xl border border-indigo-600 px-7 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Explore Books
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 text-center text-sm text-slate-500">
        © 2026 BookNook. All rights reserved.
      </footer>
    </div>
  );
}
