
import Link from "next/link";
import BookCard, { type Book } from "./BookCard";

// Temporary sample data.
// Later, books will come from MongoDB through our API.
const latestBooks: Book[] = [
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

export default function LatestBooks() {
  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-semibold uppercase tracking-widest text-indigo-600">
              Explore Our Collection
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Latest Books
            </h2>

            <p className="mt-3 text-slate-600">
              Discover books worth adding to your reading list.
            </p>
          </div>

          <Link
            href="/books"
            className="rounded-lg border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
          >
            View All Books
          </Link>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {latestBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
