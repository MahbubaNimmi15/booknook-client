
"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-5 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-700"
        >
          📚 BookNook
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-700 hover:text-indigo-600 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/login"
          className="hidden lg:inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-white font-semibold hover:bg-indigo-700"
        >
          Login
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden rounded-lg border px-4 py-2 text-slate-800"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden flex flex-col gap-4 border-t border-slate-200 bg-white px-6 py-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 font-medium"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-center text-white font-semibold"
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
}
