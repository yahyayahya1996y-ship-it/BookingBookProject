import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getBooks } from "../../features/books/services/bookService";
import { getBookingsByUser } from "../../features/bookings/services/bookingService";

const UserDashboard = () => {
  const [bookCount, setBookCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    setBookCount(getBooks().length);
    if (user) {
      setBookingCount(getBookingsByUser(user.fullName).length);
    }
  }, [user]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-6 sm:px-6 lg:px-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">User Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Overview of your available books and personal bookings in one clean view.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm uppercase tracking-[0.22em] text-slate-500">Available Books</h2>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{bookCount}</p>
          <p className="mt-2 text-sm text-slate-600">Books ready to be booked by users.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm uppercase tracking-[0.22em] text-slate-500">Your Bookings</h2>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{bookingCount}</p>
          <p className="mt-2 text-sm text-slate-600">Bookings you have created in the app.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;