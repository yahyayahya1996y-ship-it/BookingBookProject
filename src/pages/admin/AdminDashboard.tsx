import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../features/books/services/bookService";
import { getBookings } from "../../features/bookings/services/bookingService";

const AdminDashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [confirmedBookings, setConfirmedBookings] = useState(0);
  const [cancelledBookings, setCancelledBookings] = useState(0);

  useEffect(() => {
    const books = getBooks();
    const bookings = getBookings();

    setTotalBooks(Array.isArray(books) ? books.length : 0);
    setTotalBookings(Array.isArray(bookings) ? bookings.length : 0);

    if (Array.isArray(bookings)) {
      setPendingBookings(bookings.filter((b) => b.status === "pending").length);
      setConfirmedBookings(bookings.filter((b) => b.status === "confirmed").length);
      setCancelledBookings(bookings.filter((b) => b.status === "cancelled").length);
    } else {
      setPendingBookings(0);
      setConfirmedBookings(0);
      setCancelledBookings(0);
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-6 sm:px-6 lg:px-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">
              A centralized view of your booking application status and recent data.
            </p>
          </div>
        </div>
      </header>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Key statistics
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-slate-500">Total Books</h3>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{totalBooks}</p>
              </div>
              <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                Books
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Total books available in the catalog.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-slate-500">Total Bookings</h3>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{totalBookings}</p>
              </div>
              <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                All
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">All bookings created by users.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-slate-500">Pending Bookings</h3>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{pendingBookings}</p>
              </div>
              <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                Pending
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Bookings waiting for confirmation.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-slate-500">Confirmed Bookings</h3>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{confirmedBookings}</p>
              </div>
              <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                Confirmed
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Bookings that have been confirmed.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-slate-500">Cancelled Bookings</h3>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{cancelledBookings}</p>
              </div>
              <div className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                Cancelled
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Bookings that were cancelled by users or admin.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="quick-actions-heading">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="quick-actions-heading" className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              <p className="mt-1 text-sm text-slate-600">Jump to common admin tasks to manage your application.</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            <Link
              to="/admin/books"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <span>Manage Books</span>
              <span className="text-xs text-slate-400">→</span>
            </Link>

            <Link
              to="/admin/bookings"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <span>Manage Bookings</span>
              <span className="text-xs text-slate-400">→</span>
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <span>Manage Users</span>
              <span className="text-xs text-slate-400">→</span>
            </Link>

            <Link
              to="/admin/activity-log"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <span>Activity Log</span>
              <span className="text-xs text-slate-400">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;