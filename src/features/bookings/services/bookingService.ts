import type { Booking, BookingStatus } from "../types/bookingTypes";
const BOOKINGS_STORAGE_KEY = "booking_book_bookings";

export const getBookings = (): Booking[] => {
  const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Booking[];
  } catch {
    return [];
  }
};

export const saveBookings = (bookings: Booking[]): void => {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
};

export const createBooking = (bookingData: Omit<Booking, "id" | "status" | "createdAt">): Booking => {
  const bookings = getBookings();
  const newBooking: Booking = {
    id: crypto.randomUUID(),
    ...bookingData,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const updatedBookings = [...bookings, newBooking];
  saveBookings(updatedBookings);

  return newBooking;
};

export const getBookingsByUser = (userName: string): Booking[] => {
  return getBookings().filter((booking) => booking.userName === userName);
};
export const updateBookingStatus = (
  bookingId: string,
  status: BookingStatus
): Booking[] => {
  const bookings = getBookings();

  const updatedBookings = bookings.map((booking) =>
    booking.id === bookingId ? { ...booking, status } : booking
  );

  saveBookings(updatedBookings);

  return updatedBookings;
};
