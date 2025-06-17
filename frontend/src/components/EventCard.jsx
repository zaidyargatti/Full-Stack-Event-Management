import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="bg-[#1a1a1a] text-white p-4 rounded-lg shadow hover:shadow-lg">
      <h3 className="text-lg font-semibold text-blue-400">{event.title}</h3>
      <p className="text-sm text-gray-400">{event.description}</p>
      <p className="text-sm text-gray-500 mt-1">Available: {event.availableSeats}</p>
      <Link
        to={`/event/${event._id}`}
        className="inline-block mt-2 text-sm text-blue-500 hover:underline"
      >
        View & Book →
      </Link>
    </div>
  );
}
