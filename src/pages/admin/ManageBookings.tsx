import { useState } from "react";
import type { Booking, BookingStatus } from "../../features/bookings/types/bookingTypes";
import { getBookings, updateBookingStatus } from "../../features/bookings/services/bookingService";

export const ManageBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => getBookings());

  const handleStatusChange = (bookingId: string, status: BookingStatus) => {
    const updatedBookings = updateBookingStatus(bookingId, status);
    setBookings(updatedBookings);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-5 py-6 sm:px-6 lg:px-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Manage Bookings</h1>
        <p className="mt-2 text-sm text-slate-600">
          Review all bookings created by users in the system.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
            No bookings found.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-slate-900">{booking.bookTitle}</div>
                    <div className="text-sm text-slate-600">by {booking.bookAuthor}</div>
                    <div className="text-sm text-slate-600">Booked by: {booking.userName}</div>
                  </div>

                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-700">
                      {booking.status}
                    </span>
                    <div className="text-xs text-slate-500">
                      {new Date(booking.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(booking.id, "confirmed")}
                    disabled={booking.status === "confirmed"}
                    className="rounded-3xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(booking.id, "cancelled")}
                    disabled={booking.status === "cancelled"}
                    className="rounded-3xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(booking.id, "pending")}
                    disabled={booking.status === "pending"}
                    className="rounded-3xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Pending
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};