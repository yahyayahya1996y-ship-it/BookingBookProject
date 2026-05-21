import type { Book, BookFormData } from "../types/bookTypes";

const BOOKS_STORAGE_KEY = "booking_book_books";

const getDefaultBooks = (): Book[] => {
  const createdAt = new Date().toISOString();

  return [
    {
      id: crypto.randomUUID(),
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Programming",
      description: "A handbook of agile software craftsmanship with practical advice for writing maintainable code.",
      coverImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
      createdAt,
    },
    {
      id: crypto.randomUUID(),
      title: "The Lean Startup",
      author: "Eric Ries",
      category: "Business",
      description: "A methodology for building successful startups through validated learning and rapid experimentation.",
      coverImage:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80",
      createdAt,
    },
    {
      id: crypto.randomUUID(),
      title: "Don’t Make Me Think",
      author: "Steve Krug",
      category: "Design",
      description: "A practical guide to intuitive web and product design for digital experiences that work.",
      coverImage:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=500&q=80",
      createdAt,
    },
    {
      id: crypto.randomUUID(),
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      category: "Science",
      description: "An accessible tour of cosmology and the nature of space, time, and the universe.",
      coverImage:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
      createdAt,
    },
    {
      id: crypto.randomUUID(),
      title: "Atomic Habits",
      author: "James Clear",
      category: "Business",
      description: "A practical framework for building better habits and transforming your work and life.",
      coverImage:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
      createdAt,
    },
  ];
};

export const getBooks = (): Book[] => {
  const books = localStorage.getItem(BOOKS_STORAGE_KEY);

  if (!books) {
    const defaultBooks = getDefaultBooks();
    saveBooks(defaultBooks);
    return defaultBooks;
  }

  try {
    return JSON.parse(books) as Book[];
  } catch {
    const defaultBooks = getDefaultBooks();
    saveBooks(defaultBooks);
    return defaultBooks;
  }
};

export const saveBooks = (books: Book[]): void => {
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
};

export const addBook = (bookData: BookFormData): Book => {
  const books = getBooks();

  const newBook: Book = {
    id: crypto.randomUUID(),
    ...bookData,
    createdAt: new Date().toISOString(),
  };

  const updatedBooks = [...books, newBook];

  saveBooks(updatedBooks);

  return newBook;
};

export const deleteBook = (bookId: string): void => {
  const books = getBooks();

  const updatedBooks = books.filter((book) => book.id !== bookId);

  saveBooks(updatedBooks);
};