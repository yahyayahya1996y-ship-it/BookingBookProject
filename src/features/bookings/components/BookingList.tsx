import type { Booking } from "../types/bookingTypes";

type BookingListProps = {
  bookings: Booking[];
  showUserName?: boolean;
};

const BookingList = ({ bookings, showUserName = false }: BookingListProps) => {
  if (bookings.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="text-lg font-semibold text-slate-900">{booking.bookTitle}</div>
              <div className="text-sm text-slate-600">by {booking.bookAuthor}</div>
              {showUserName ? (
                <div className="text-sm text-slate-600">Booked by: {booking.userName}</div>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2 sm:items-end">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-700">
                {booking.status}
              </span>
              <div className="text-xs text-slate-500">
                {new Date(booking.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingList;
