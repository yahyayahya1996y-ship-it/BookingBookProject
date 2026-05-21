export const ActivityLog: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Activity Log</h1>
        <p className="mt-2 text-sm text-slate-600">
          Monitor recent system actions and user activity in a single place.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 shadow-sm">
          No activity has been recorded yet.
        </div>
      </section>
    </div>
  );
};
