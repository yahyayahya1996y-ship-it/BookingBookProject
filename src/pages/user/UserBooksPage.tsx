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
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">
          Available Books
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Browse the shared book collection and reserve the titles you want.
        </p>
      </header>

      <BookFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        books={books}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          Showing <span className="font-semibold text-slate-900">{filteredBooks.length}</span> of <span className="font-semibold text-slate-900">{books.length}</span> books
        </div>
        <div className="inline-flex items-center justify-end gap-2 text-slate-500">
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
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 shadow-sm">
          No books are currently available. Please check back later.
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 shadow-sm">
          No books match your search or filters.
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <BookCard book={book} />

              <div className="mt-4 flex justify-end">
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