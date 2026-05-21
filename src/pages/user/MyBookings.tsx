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

  return (
    <div className="space-y-6 p-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">My Bookings</h1>
          <p className="mt-2 text-sm text-slate-600">Review your current bookings and track their status.</p>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <BookingList bookings={bookings} />
      </section>
    </div>
  );
};
