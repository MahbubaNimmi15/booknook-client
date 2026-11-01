
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <section className="mx-auto max-w-7xl px-6 py-28 text-center">
          <p className="mb-4 font-semibold uppercase tracking-widest text-indigo-600">
            Your Digital Library
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Discover Your Next
            <span className="text-indigo-600"> Great Read</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Explore a world of books, discover inspiring stories,
            and manage your reading journey with BookNook.
          </p>

          <Link
            href="/books"
            className="mt-9 inline-block rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700"
          >
            Explore All Books
          </Link>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        © 2026 BookNook. All rights reserved.
      </footer>
    </div>
  );
}
