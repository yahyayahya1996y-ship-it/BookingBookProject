import type { Book } from "../types/bookTypes";

type BookFiltersProps = {
  searchTerm: string;
  selectedCategory: string;
  books: Book[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export default function BookFilters({
  searchTerm,
  selectedCategory,
  books,
  onSearchChange,
  onCategoryChange,
}: BookFiltersProps) {
  const categories = Array.from(new Set(books.map((book) => book.category)));

  return (
    <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr]">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Search books
          </label>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Category filter
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}