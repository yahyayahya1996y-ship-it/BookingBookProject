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
    <nav className="bg-slate-900 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Booking Book</h1>
          <p className="mt-1 text-sm text-slate-300">Shared library and booking dashboard</p>
        </div>

        {user && (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200">
              Signed in as <span className="font-semibold text-white">{user.fullName}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
