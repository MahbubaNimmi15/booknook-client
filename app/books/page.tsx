
import Link from "next/link";
import Navbar from "../../components/Navbar";
import BookCard, { type Book } from "../../components/BookCard";

export const metadata = {
  title: "BookNook | All Books",
  description: "Browse the BookNook library collection.",
};

// Temporary sample books.
// These will be replaced by MongoDB data.
const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    image: "",
    availableCopies: 5,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    image: "",
    availableCopies: 8,
  },
  {
    id: "3",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    image: "",
    availableCopies: 4,
  },
  {
    id: "4",
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    image: "",
    availableCopies: 6,
  },
  {
    id: "5",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    image: "",
    availableCopies: 3,
  },
  {
    id: "6",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    image: "",
    availableCopies: 7,
  },
];

export default function AllBooksPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-widest text-indigo-600">
            Our Library
          </p>

          <h1 className="mt-4 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Explore All Books
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Browse our collection and discover your next favorite read.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-block rounded-xl border border-indigo-600 px-8 py-3 font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
