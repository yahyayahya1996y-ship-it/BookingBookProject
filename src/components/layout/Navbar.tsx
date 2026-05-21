import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-slate-900">Booking Book</span>
          <span className="text-sm text-slate-500">Professional booking dashboard</span>
        </div>

        {user && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
              {user.fullName} • {user.role}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
