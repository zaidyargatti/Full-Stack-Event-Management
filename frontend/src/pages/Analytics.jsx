import { useEffect, useState } from "react";
import axios from "../services/Axios";
import Sidebar from "../components/Sidebar";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/admin/analytics").then((res) => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen flex bg-black text-white">
      <Sidebar />
      <div className="flex-1 p-10 space-y-6">
        <h2 className="text-3xl font-bold text-blue-400">Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1f1f1f] p-4 rounded-xl text-center">
            <p className="text-sm text-gray-400">Total Events</p>
            <p className="text-xl font-bold text-blue-400">{data.totalEvents}</p>
          </div>
          <div className="bg-[#1f1f1f] p-4 rounded-xl text-center">
            <p className="text-sm text-gray-400">Total Bookings</p>
            <p className="text-xl font-bold text-blue-400">{data.totalSeatsBooked}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-2">Per Event Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.seatsBookedPerEvent.map((e, i) => (
              <div
                key={i}
                className="bg-[#1f1f1f] p-4 rounded-lg border border-[#2d2d2d]"
              >
                <p className="font-semibold">{e.eventTitle}</p>
                <p className="text-sm">Booked: {e.bookedSeats}</p>
                <p className="text-sm">Occupancy: {e.percentOccupied.toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
