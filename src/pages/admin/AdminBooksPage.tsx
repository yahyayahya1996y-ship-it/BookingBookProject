import { useEffect, useState } from "react";
import BookForm from "../../features/books/components/BookForm";
import BookList from "../../features/books/components/BookList";
import type { Book, BookFormData } from "../../features/books/types/bookTypes";
import { addBook, deleteBook, getBooks } from "../../features/books/services/bookService";

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  const handleBookAdded = (bookData: BookFormData) => {
    const newBook = addBook(bookData);
    setBooks((current) => [...current, newBook]);
  };

  const handleDelete = (bookId: string) => {
    deleteBook(bookId);
    setBooks((current) => current.filter((book) => book.id !== bookId));
  };

  return (
    <div className="space-y-8 p-6">
      <header className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Admin Books</h1>
          <p className="mt-2 text-sm text-slate-600">Manage your book inventory from one shared feature module.</p>
        </div>
      </header>

      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Add New Book</h2>
          <p className="mt-2 text-sm text-slate-600">Use the shared book form to keep add logic centralized.</p>
          <div className="mt-6">
            <BookForm onBookAdded={handleBookAdded} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Current Books</h2>
          <p className="mt-2 text-sm text-slate-600">Delete any book from the shared book list below.</p>
          <div className="mt-6">
            <BookList books={books} showActions onDelete={handleDelete} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminBooksPage;
