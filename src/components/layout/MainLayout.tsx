import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const userLinks = [
    { label: "Dashboard", path: "/user/dashboard" },
    { label: "Available Books", path: "/user/books" },
    { label: "My Bookings", path: "/user/bookings" },
    { label: "Profile", path: "/user/profile" },
  ];

  const adminLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Books", path: "/admin/books" },
    { label: "Manage Bookings", path: "/admin/bookings" },
    { label: "Manage Users", path: "/admin/users" },
    { label: "Activity Log", path: "/admin/activity-log" },
  ];

  const menuLinks = isAdmin ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
          {isSidebarOpen ? (
            <div>
              <h1 className="text-xl font-bold text-slate-900">Booking Book</h1>
              <p className="text-xs text-slate-500">
                {isAdmin ? "Admin Panel" : "User Panel"}
              </p>
            </div>
          ) : (
            <div className="text-2xl font-bold text-sky-600">B</div>
          )}

          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-slate-700 transition hover:bg-slate-100"
          >
            ☰
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          {menuLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-sky-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100 hover:text-sky-700"
                }`
              }
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-current"></span>
              {isSidebarOpen ? <span>{link.label}</span> : null}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          {isSidebarOpen ? (
            <div className="mb-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                {user?.fullName || "User"}
              </p>
              <p className="text-xs capitalize text-slate-500">
                {user?.role || "user"}
              </p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            {isSidebarOpen ? "Logout" : "⏻"}
          </button>

          {isSidebarOpen ? (
            <p className="mt-4 text-center text-xs text-slate-400">
              © 2026 Booking Book
            </p>
          ) : null}
        </div>
      </aside>

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isAdmin ? "Admin Dashboard" : "User Dashboard"}
            </h2>
            <p className="text-sm text-slate-500">
              Professional booking management system
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.fullName || "User"}
              </p>
              <p className="text-xs capitalize text-slate-500">
                Signed in as {user?.role || "user"}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sm font-bold uppercase text-sky-700">
              {user?.fullName?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-5rem)] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;