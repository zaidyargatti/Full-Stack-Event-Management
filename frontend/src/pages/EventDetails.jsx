import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../services/Axios";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios.get(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  const handleBooking = async () => {
    setError("");
    setSuccess("");
    try {
      await axios.post(`/bookings/${id}/book`);
      setBooked(true);
      setSuccess("Seat booked successfully!");
      setEvent({ ...event, availableSeats: event.availableSeats - 1 });
    } catch (err) {
      setError(err.response?.data?.msg || "Booking failed");
    }
  };

  if (!event) return null;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-xl mx-auto bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a]">
        <h2 className="text-2xl text-blue-400 font-bold mb-2">{event.title}</h2>
        <p className="text-gray-300 mb-2">{event.description}</p>
        <p className="text-sm text-gray-500 mb-4">
          Seats Available: {event.availableSeats}
        </p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-3">{success}</p>}

        <button
          disabled={booked || event.availableSeats <= 0}
          onClick={handleBooking}
          className={`w-full ${
            booked ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-3 rounded-lg transition`}
        >
          {booked ? "Already Booked" : "Book My Seat"}
        </button>
      </div>
    </div>
  );
}
