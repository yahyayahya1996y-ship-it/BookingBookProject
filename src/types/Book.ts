export type BookCategory =
  | "Programming"
  | "Science"
  | "History"
  | "Business"
  | "Mathematics"
  | "Design"
  | "Novel"
  | "Technology"
  | "Education";

export interface Book {
  id: number;
  title: string;
  author: string;
  category: BookCategory;
  pages: number;
  description: string;
  isbn: string;
  imageUrl: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: string;
  updatedAt?: string;
}