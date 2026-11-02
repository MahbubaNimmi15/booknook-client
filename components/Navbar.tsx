
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = session?.user;

  async function handleLogout() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Logout failed");
      return;
    }

    setProfileOpen(false);
    setMobileOpen(false);
    toast.success("Logged out successfully!");
    router.push("/");
    router.refresh();
  }

  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "All Books", href: "/books" },
  ];

  const privateLinks = [
    { label: "Add Book", href: "/add-book" },
    { label: "My Books", href: "/my-books" },
    { label: "My Borrows", href: "/my-borrows" },
  ];

  const links = user
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  return (
    <>
      <Toaster position="top-right" />

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link
            href="/"
            className="text-2xl font-extrabold text-indigo-600"
          >
            BookNook
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Authentication */}
          <div className="hidden items-center gap-3 lg:flex">
            {isPending ? (
              <span className="text-sm text-slate-400">
                Loading...
              </span>
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 p-1 pr-3"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}

                  <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
                    {user.name}
                  </span>
                  <span className="text-slate-400">⌄</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                    <p className="truncate font-semibold text-slate-900">
                      {user.name}
                    </p>

                    <p className="mb-3 truncate text-xs text-slate-500">
                      {user.email}
                    </p>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-lg bg-red-50 px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xl text-slate-700 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-medium text-slate-700 hover:text-indigo-600"
                >
                  {link.label}
                </Link>
              ))}

              {!isPending && (
                user ? (
                  <div className="border-t border-slate-200 pt-4">
                    <p className="font-semibold text-slate-900">
                      {user.name}
                    </p>

                    <p className="mb-3 text-sm text-slate-500">
                      {user.email}
                    </p>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="font-semibold text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3 border-t border-slate-200 pt-4">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg border border-indigo-600 px-4 py-2 text-indigo-600"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                    >
                      Register
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
