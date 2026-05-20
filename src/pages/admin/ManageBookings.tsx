import { useState } from "react";
import BookingList from "../../features/bookings/components/BookingList";
import type { Booking } from "../../features/bookings/types/bookingTypes";
import { getBookings } from "../../features/bookings/services/bookingService";

export const ManageBookings = () => {
  const [bookings] = useState<Booking[]>(() => getBookings());

  return (
    <div className="space-y-6 p-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Manage Bookings</h1>
        <p className="mt-2 text-sm text-slate-600">
          Review all bookings created by users in the system.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <BookingList bookings={bookings} showUserName />
      </section>
    </div>
  );
};