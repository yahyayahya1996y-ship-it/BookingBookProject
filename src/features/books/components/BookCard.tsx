import type { Book } from "../types/bookTypes";

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex flex-col gap-5 p-5 sm:flex-row">
        <div className="sm:w-44 shrink-0 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-44 w-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{book.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{book.author}</p>
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
