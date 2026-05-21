import { Link } from 'react-router-dom'

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-full border-b border-slate-200 bg-white p-6 md:w-72 md:border-b-0 md:border-r md:bg-slate-50 xl:w-64">
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">User Menu</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/user/dashboard" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/user/books" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                Available Books
              </Link>
            </li>
            <li>
              <Link to="/user/my-bookings" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                My Bookings
              </Link>
            </li>
            <li>
              <Link to="/user/profile" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Admin Menu</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/admin/dashboard" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/books" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                Manage Books
              </Link>
            </li>
            <li>
              <Link to="/admin/bookings" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                Manage Users
              </Link>
            </li>
            <li>
              <Link to="/admin/activity-log" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                Activity Log
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
