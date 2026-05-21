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
    <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow-md md:grid-cols-3">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
      />

      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

    </div>
  );
}