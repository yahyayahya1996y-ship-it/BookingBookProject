export type ActivityAction =
  | "LOGIN"
  | "LOGOUT"
  | "ADD_BOOK"
  | "UPDATE_BOOK"
  | "DELETE_BOOK"
  | "REQUEST_BOOKING"
  | "ACCEPT_BOOKING"
  | "REJECT_BOOKING"
  | "CANCEL_BOOKING"
  | "RETURN_BOOK";

export interface ActivityLog {
  id: number;
  userId: number;
  action: ActivityAction;
  message: string;
  createdAt: string;
}