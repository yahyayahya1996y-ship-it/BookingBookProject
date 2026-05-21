import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getBooks } from "../../features/books/services/bookService";
import { getBookingsByUser } from "../../features/bookings/services/bookingService";

const UserDashboard = () => {
  const [bookCount, setBookCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    setBookCount(getBooks().length);

    if (user) {
      const bookings = getBookingsByUser(user.fullName);
      setBookingCount(bookings.length);
      setPendingCount(bookings.filter((booking) => booking.status === "pending").length);
      setConfirmedCount(bookings.filter((booking) => booking.status === "confirmed").length);
      setCancelledCount(bookings.filter((booking) => booking.status === "cancelled").length);
    } else {
      setBookingCount(0);
      setPendingCount(0);
      setConfirmedCount(0);
      setCancelledCount(0);
    }
  }, [user]);

  const cardItems = [
    {
      label: "Available Books",
      value: bookCount,
      description: "Books ready for reservation.",
      accent: "from-cyan-500 to-sky-500",
    },
    {
      label: "My Bookings",
      value: bookingCount,
      description: "Total booking requests you have created.",
      accent: "from-violet-500 to-fuchsia-500",
    },
    {
      label: "Pending Bookings",
      value: pendingCount,
      description: "Requests awaiting approval.",
      accent: "from-amber-500 to-orange-500",
    },
    {
      label: "Confirmed Bookings",
      value: confirmedCount,
      description: "Approved bookings ready for pickup.",
      accent: "from-emerald-500 to-teal-500",
    },
    {
      label: "Cancelled Bookings",
      value: cancelledCount,
      description: "Bookings that have been cancelled.",
      accent: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-8 shadow-xl shadow-slate-900/20 sm:p-10">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">User dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Manage your library experience with ease
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            A clean workspace to track available books, monitor booking status, and navigate quickly to your most important actions.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm">
            <p className="text-sm text-slate-300">Welcome back,</p>
            <p className="mt-3 text-3xl font-semibold text-white">{user?.fullName ?? "Reader"}</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm">
            <p className="text-sm text-slate-300">Active books</p>
            <p className="mt-3 text-3xl font-semibold text-white">{bookCount}</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm">
            <p className="text-sm text-slate-300">Your bookings</p>
            <p className="mt-3 text-3xl font-semibold text-white">{bookingCount}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cardItems.map((card) => (
            <div key={card.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className={`inline-flex rounded-full bg-gradient-to-r ${card.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-sm`}>
                {card.label}
              </div>
              <p className="mt-6 text-4xl font-semibold text-slate-900">{card.value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
            </div>
          ))}
        </div>

        <aside className="space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
            <p className="mt-2 text-sm text-slate-600">
              Jump directly to the pages you use most often.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/user/books"
              className="block rounded-2xl border border-slate-200 bg-slate-950 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              View Available Books
            </Link>
            <Link
              to="/user/my-bookings"
              className="block rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Review My Bookings
            </Link>
            <Link
              to="/user/profile"
              className="block rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Open Profile
            </Link>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Need a quick overview?</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The dashboard updates automatically based on your bookings. Use the cards above to see every booking status at a glance.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default UserDashboard;