import { useAuth } from "../../context/AuthContext";

export const UserProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 p-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">User Profile</h1>
        <p className="mt-2 text-sm text-slate-600">
          View your account details and personal information stored in the app.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {user ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Full Name</h2>
              <p className="mt-3 text-lg font-medium text-slate-900">{user.fullName}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Username</h2>
              <p className="mt-3 text-lg font-medium text-slate-900">{user.username}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Role</h2>
              <p className="mt-3 text-lg font-medium text-slate-900">{user.role}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Member Since</h2>
              <p className="mt-3 text-lg font-medium text-slate-900">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 shadow-sm">
            No profile information is available. Please log in to view your account details.
          </div>
        )}
      </section>
    </div>
  );
};
