import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import BookCard from "../../features/books/components/BookCard";
import BookFilters from "../../features/books/components/BookFilters";
import type { Book } from "../../features/books/types/bookTypes";
import { getBooks } from "../../features/books/services/bookService";
import { createBooking } from "../../features/bookings/services/bookingService";

const UserBooksPage = () => {
  const [books] = useState<Book[]>(() => getBooks());
  const [message, setMessage] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { user } = useAuth();

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, selectedCategory]);

  const handleBookNow = (book: Book) => {
    if (!user) {
      setMessage("You must be logged in to place a booking.");
      return;
    }

    setIsBooking(book.id);

    createBooking({
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      userName: user.fullName,
    });

    setMessage(`Booked ${book.title} successfully.`);
    setTimeout(() => setMessage(null), 4000);
    setIsBooking(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-5 py-6 sm:px-6 lg:px-8">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Available books</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Discover books ready for your next reading session.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Search the library, filter by category, and reserve books instantly with a single click.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 xl:text-right">
            <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Total titles</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{books.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Filtered results</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{filteredBooks.length}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Search and filter books</h2>
            <p className="mt-2 text-sm text-slate-600">
              Use the controls below to narrow the list and find the perfect title.
            </p>
          </div>
          <div className="w-full lg:max-w-2xl">
            <BookFilters
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              books={books}
              onSearchChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          Showing <span className="font-semibold text-slate-900">{filteredBooks.length}</span> of <span className="font-semibold text-slate-900">{books.length}</span> books
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-600">
            {selectedCategory === "all" ? "All categories" : selectedCategory}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-600">
            {searchTerm ? "Filtered" : "All books"}
          </span>
        </div>
      </div>

      {message ? (
        <div className="rounded-3xl border border-sky-200 bg-sky-50 px-5 py-4 text-slate-900 shadow-sm">
          {message}
        </div>
      ) : null}

      {books.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-500">
            📚
          </div>
          <h2 className="text-xl font-semibold text-slate-900">No books are available</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Our library is currently empty. Check back soon for new titles and fresh reading recommendations.
          </p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-500">
            🔍
          </div>
          <h2 className="text-xl font-semibold text-slate-900">No books match your filters</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Try a broader search or select a different category to find more books.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredBooks.map((book) => (
            <div key={book.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <BookCard book={book} />

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleBookNow(book)}
                  disabled={isBooking === book.id}
                  className="rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isBooking === book.id ? "Booking..." : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default UserBooksPage;