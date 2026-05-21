import { useEffect, useMemo, useState } from "react";
import BookForm from "../../features/books/components/BookForm";
import BookList from "../../features/books/components/BookList";
import type { Book, BookFormData } from "../../features/books/types/bookTypes";
import { addBook, deleteBook, getBooks } from "../../features/books/services/bookService";

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  const totalBooks = books.length;
  const categories = useMemo(() => Array.from(new Set(books.map((book) => book.category))), [books]);

  const handleBookAdded = (bookData: BookFormData) => {
    const newBook = addBook(bookData);
    setBooks((current) => [...current, newBook]);
  };

  const handleDelete = (bookId: string) => {
    deleteBook(bookId);
    setBooks((current) => current.filter((book) => book.id !== bookId));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-6 sm:px-6 lg:px-8">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Library administration</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Manage book inventory</h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Add new titles, organize categories, and maintain a polished collection for library users.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 xl:text-right">
            <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Total books</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{totalBooks}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Categories</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{categories.length}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Current Catalog</h2>
              <p className="mt-1 text-sm text-slate-600">Review available titles and manage the collection.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {totalBooks} titles · {categories.length} categories
            </span>
          </div>

          <BookList books={books} showActions onDelete={handleDelete} />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Add New Book</h2>
            <p className="mt-1 text-sm text-slate-600">Enter book details below to add a new title.</p>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200">
            <BookForm onBookAdded={handleBookAdded} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminBooksPage;
