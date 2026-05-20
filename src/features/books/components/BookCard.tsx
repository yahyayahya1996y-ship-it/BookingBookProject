import type { Book } from "../types/bookTypes";

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <article className="rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        <div className="sm:w-40 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-40 w-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{book.title}</h3>
              <p className="text-sm text-slate-500">{book.author}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600">
              {book.category}
            </span>
          </div>

          <p className="text-sm leading-6 text-slate-700">{book.description}</p>

          <div className="text-xs text-slate-500">
            Added on {new Date(book.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
