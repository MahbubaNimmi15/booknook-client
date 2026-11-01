
import Link from "next/link";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <HeroSlider />

        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="font-semibold uppercase tracking-widest text-indigo-600">
            Discover More
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Explore the World of Books
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            BookNook makes it easy to discover interesting books,
            borrow your favorites, and enjoy your reading journey.
          </p>

          <Link
            href="/books"
            className="mt-8 inline-block rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700"
          >
            View All Books
          </Link>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
        © 2026 BookNook. All rights reserved.
      </footer>
    </div>
  );
}
