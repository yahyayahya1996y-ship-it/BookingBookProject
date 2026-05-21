import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const userLinks = [
    { to: '/user/dashboard', label: 'Dashboard' },
    { to: '/user/books', label: 'Available Books' },
    { to: '/user/my-bookings', label: 'My Bookings' },
    { to: '/user/profile', label: 'Profile' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/books', label: 'Manage Books' },
    { to: '/admin/bookings', label: 'Manage Bookings' },
    { to: '/admin/users', label: 'Manage Users' },
    { to: '/admin/activity-log', label: 'Activity Log' },
  ];

  const links = user?.role === 'admin' ? adminLinks : user ? userLinks : [];
  const menuLabel = user?.role === 'admin' ? 'Admin Menu' : 'User Menu';

  return (
    <aside className="w-full border-b border-slate-200 bg-white p-6 md:w-72 md:border-b-0 md:border-r xl:w-64">
      <div className="flex h-full min-h-[calc(100vh-80px)] flex-col justify-between gap-8">
        <div>
          <div className="mb-6 rounded-3xl bg-slate-900 px-4 py-4 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Booking Book</p>
            <p className="mt-2 text-lg font-semibold">Dashboard</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{menuLabel}</h3>
            <ul className="space-y-2 list-none">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? 'bg-slate-900 text-white shadow'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {user && (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Signed in as</p>
            <p className="mt-2 font-semibold text-slate-900">{user.fullName}</p>
            <p className="text-xs text-slate-500">{user.role}</p>
          </div>
        )}
      </div>
    </aside>
  )
}
