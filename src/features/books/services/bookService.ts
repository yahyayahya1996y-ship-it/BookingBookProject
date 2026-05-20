import type { Book, BookFormData } from "../types/bookTypes";

const BOOKS_STORAGE_KEY = "booking_book_books";

export const getBooks = (): Book[] => {
  const books = localStorage.getItem(BOOKS_STORAGE_KEY);

  if (!books) {
    return [];
  }

  return JSON.parse(books) as Book[];
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