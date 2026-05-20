import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import BookCard from "../../features/books/components/BookCard";
import type { Book } from "../../features/books/types/bookTypes";
import { getBooks } from "../../features/books/services/bookService";
import { createBooking } from "../../features/bookings/services/bookingService";

const UserBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    setBooks(getBooks());
  }, []);

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
    <div className="space-y-6 p-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Available Books</h1>
        <p className="mt-2 text-sm text-slate-600">
          Browse the shared book collection and book your next read with one click.
        </p>
      </header>

      {message ? (
        <div className="rounded-3xl border border-sky-200 bg-sky-50 px-5 py-4 text-slate-900 shadow-sm">
          {message}
        </div>
      ) : null}

      <section className="grid gap-6">
        {books.map((book) => (
          <div key={book.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
    </div>
  );
};

export default UserBooksPage;
