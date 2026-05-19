export type BookingStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "returned"
  | "overdue";

export interface Booking {
  id: number;
  userId: number;
  bookId: number;
  requestDate: string;
  acceptedDate?: string;
  dueDate?: string;
  returnedDate?: string;
  status: BookingStatus;
  adminNote?: string;
}