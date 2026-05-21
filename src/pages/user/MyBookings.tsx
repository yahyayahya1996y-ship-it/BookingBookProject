import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import BookingList from "../../features/bookings/components/BookingList";
import type { Booking } from "../../features/bookings/types/bookingTypes";
import { getBookingsByUser } from "../../features/bookings/services/bookingService";

export const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }

    setBookings(getBookingsByUser(user.fullName));
  }, [user]);

  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((booking) => booking.status === "pending").length;
  const confirmedCount = bookings.filter((booking) => booking.status === "confirmed").length;
  const cancelledCount = bookings.filter((booking) => booking.status === "cancelled").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-5 py-6 sm:px-6 lg:px-8">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">My bookings</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Track your current and past book requests</h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Review each reservation request, see its current status, and keep your reading plans organized.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Total bookings</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{totalBookings}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Active requests</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{pendingCount}</p>
            </div>
          </div>
        </div>
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
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500 shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-500">
              📭
            </div>
            <h2 className="text-xl font-semibold text-slate-900">No bookings yet</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              You have not requested any books yet. Browse available titles and reserve your next read.
            </p>
          </div>
        ) : (
          <BookingList bookings={bookings} />
        )}
      </section>
    </div>
  );
};
