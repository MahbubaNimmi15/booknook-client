
import Navbar from "../../components/Navbar";

export const metadata = {
  title: "Add Book | BookNook",
};

export default function AddBookPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Add a New Book
          </h1>
          <p className="mt-4 text-slate-600">
            Share a new book with the BookNook community.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-md">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-semibold text-slate-700"
              >
                Book Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter book title"
                className="w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="mb-2 block font-semibold text-slate-700"
              >
                Author
              </label>
              <input
                id="author"
                type="text"
                placeholder="Enter author name"
                className="w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block font-semibold text-slate-700"
              >
                Category
              </label>
              <select
                id="category"
                className="w-full rounded-lg border border-slate-300 p-3"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Science</option>
                <option>History</option>
                <option>Biography</option>
                <option>Self-Help</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="copies"
                className="mb-2 block font-semibold text-slate-700"
              >
                Total Copies
              </label>
              <input
                id="copies"
                type="number"
                min="1"
                placeholder="Enter number of copies"
                className="w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block font-semibold text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Write a short description"
                className="w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-lg bg-indigo-400 py-4 font-bold text-white"
            >
              Add Book (Coming Soon)
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
