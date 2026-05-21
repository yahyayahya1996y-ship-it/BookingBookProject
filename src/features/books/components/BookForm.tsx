import { useState } from "react";
import type { BookFormData } from "../types/bookTypes";

type BookFormProps = {
  onBookAdded: (bookData: BookFormData) => void;
};

const initialFormState: BookFormData = {
  title: "",
  author: "",
  category: "",
  description: "",
  coverImage: "",
};

const BookForm = ({ onBookAdded }: BookFormProps) => {
  const [formData, setFormData] = useState<BookFormData>(initialFormState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title || !formData.author || !formData.category || !formData.coverImage) {
      return;
    }

    onBookAdded(formData);
    setFormData(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">New book details</h2>
          <p className="mt-1 text-sm text-slate-600">Fill out the form to add a new book to the collection.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Title
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            placeholder="Enter book title"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Author
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            placeholder="Enter author name"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Category
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            placeholder="Enter book category"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Cover Image URL
          <input
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            placeholder="https://example.com/cover.jpg"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          rows={4}
          placeholder="Write a short description for the book"
        />
      </label>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Add Book
        </button>
      </div>
    </form>
  );
};

export default BookForm;
