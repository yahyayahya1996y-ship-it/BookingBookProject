export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
  createdAt: string;
}

export interface BookFormData {
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
}