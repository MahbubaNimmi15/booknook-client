
import Link from "next/link";
import { Suspense } from "react";

import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import LatestBooks from "../components/LatestBooks";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={<div className="h-16 bg-white" />}>
        <Navbar />
      </Suspense>

      <main>
        <Suspense
          fallback={
            <div className="flex min-h-[400px] items-center justify-center bg-indigo-600 text-white">
              Loading featured books...
            </div>
          }
        >
          <HeroSlider />
        </Suspense>

        <Suspense
          fallback={
            <div className="py-20 text-center text-slate-600">
              Loading latest books...
            </div>
          }
        >
          <LatestBooks />
        </Suspense>

        <section className="bg-white px-6 py-20 text-center">
          <div className="mx-auto max-w-4xl">
            <p className="font-semibold uppercase tracking-widest text-indigo-600">
              Your Reading Journey
            </p>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Every Great Story Starts With a Book
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Explore inspiring stories, discover new perspectives,
              and find your next favorite read with BookNook.
            </p>

            <Link
              href="/books"
              className="mt-8 inline-block rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700"
            >
              Explore Collection
            </Link>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-20 text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-extrabold text-slate-900">
              How BookNook Works
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                ["01", "Explore", "Browse our book collection."],
                ["02", "Borrow", "Choose and borrow your favorite book."],
                ["03", "Return", "Return the book when you finish reading."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-2xl bg-white p-8 shadow-sm"
                >
                  <p className="text-3xl font-bold text-indigo-600">
                    {number}
                  </p>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-3 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
        © 2026 BookNook. All rights reserved.
      </footer>
    </div>
  );
}
