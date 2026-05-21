import { useEffect, useState } from "react";
import { getBooks } from "../../features/books/services/bookService";
import { getBookings } from "../../features/bookings/services/bookingService";

const AdminDashboard = () => {
  const [bookCount, setBookCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    setBookCount(getBooks().length);
    setBookingCount(getBookings().length);
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-6 sm:px-6 lg:px-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          A centralized view of your booking application status and recent data.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm uppercase tracking-[0.24em] text-slate-500">Available Books</h2>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{bookCount}</p>
          <p className="mt-2 text-sm text-slate-600">Books currently stored in the system.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm uppercase tracking-[0.24em] text-slate-500">Bookings</h2>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{bookingCount}</p>
          <p className="mt-2 text-sm text-slate-600">Total bookings created by users.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm uppercase tracking-[0.24em] text-slate-500">Admin Actions</h2>
          <p className="mt-4 text-lg font-semibold text-slate-900">Stay on top of books, users, and booking activity.</p>
          <p className="mt-2 text-sm text-slate-600">Use the navigation to manage records and review system activity.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;