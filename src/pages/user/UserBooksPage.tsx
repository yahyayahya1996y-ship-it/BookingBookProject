import { useEffect, useState } from "react";
import BookList from "../../features/books/components/BookList";
import type { Book } from "../../features/books/types/bookTypes";
import { getBooks } from "../../features/books/services/bookService";

const UserBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  return (
    <div className="space-y-6 p-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Available Books</h1>
        <p className="mt-2 text-sm text-slate-600">Browse the shared book collection. No create or delete access from the user view.</p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <BookList books={books} showActions={false} />
      </section>
    </div>
  );
};

export default UserBooksPage;
