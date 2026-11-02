
import Link from "next/link";

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  availableCopies: number;
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-64 items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
        <div className="flex h-48 w-36 items-center justify-center rounded-lg bg-indigo-600 p-4 text-center text-lg font-bold text-white shadow-xl">
          {book.title}
        </div>
      </div>

      <div className="p-6">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          {book.category}
        </span>

        <h3 className="mt-4 line-clamp-2 text-xl font-bold text-slate-900">
          {book.title}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          by {book.author}
        </p>

        <p className="mt-4 text-sm font-medium text-emerald-600">
          {book.availableCopies} copies available
        </p>

        <Link
          href={`/books/${book.id}`}
          className="mt-5 block rounded-lg bg-indigo-600 px-5 py-3 text-center font-semibold text-white hover:bg-indigo-700"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
