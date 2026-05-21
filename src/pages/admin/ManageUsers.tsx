export const ManageUsers: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-5 py-6 sm:px-6 lg:px-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Manage Users</h1>
        <p className="mt-2 text-sm text-slate-600">
          Review and manage user accounts connected to the booking platform.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 shadow-sm">
          No user actions are configured yet. User management will appear here once enabled.
        </div>
      </section>
    </div>
  );
};
