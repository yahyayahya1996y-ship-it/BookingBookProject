import type { Book } from "../types/bookTypes";
import BookCard from "./BookCard";

type BookListProps = {
  books: Book[];
  showActions?: boolean;
  onDelete?: (bookId: string) => void;
};

const BookList = ({ books, showActions = false, onDelete }: BookListProps) => {
  if (books.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 shadow-sm">
        No books found. Please add a book to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <div key={book.id} className="group">
          <BookCard book={book} />
          {showActions && onDelete ? (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => onDelete(book.id)}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default BookList;
