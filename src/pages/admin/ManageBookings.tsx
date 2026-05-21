import { useMemo, useState } from "react";
import type { Booking, BookingStatus } from "../../features/bookings/types/bookingTypes";
import { getBookings, updateBookingStatus } from "../../features/bookings/services/bookingService";

export const ManageBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => getBookings());

  const totalBookings = bookings.length;
  const pendingCount = useMemo(
    () => bookings.filter((booking) => booking.status === "pending").length,
    [bookings]
  );
  const confirmedCount = useMemo(
    () => bookings.filter((booking) => booking.status === "confirmed").length,
    [bookings]
  );
  const cancelledCount = useMemo(
    () => bookings.filter((booking) => booking.status === "cancelled").length,
    [bookings]
  );

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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total bookings</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{totalBookings}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Pending</p>
          <p className="mt-4 text-3xl font-semibold text-amber-700">{pendingCount}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Confirmed</p>
          <p className="mt-4 text-3xl font-semibold text-emerald-700">{confirmedCount}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Cancelled</p>
          <p className="mt-4 text-3xl font-semibold text-rose-700">{cancelledCount}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
            No bookings found.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const statusClasses =
                booking.status === "confirmed"
                  ? "bg-emerald-100 text-emerald-700"
                  : booking.status === "cancelled"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-amber-100 text-amber-700";

              return (
                <div key={booking.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="grid gap-4 md:grid-cols-[1.6fr_1fr] items-start">
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-slate-900">{booking.bookTitle}</div>
                      <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                        <span>by {booking.bookAuthor}</span>
                        <span>•</span>
                        <span>Booked by {booking.userName}</span>
                      </div>
                      <div className="text-xs text-slate-500">{new Date(booking.createdAt).toLocaleString()}</div>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.22em] ${statusClasses}`}>
                        {booking.status}
                      </span>
                      <div className="flex flex-wrap gap-2">
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
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};