export interface Booking {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  userName: string;
  status: BookingStatus;
  createdAt: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled";
