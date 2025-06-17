import { useEffect, useState } from "react";
import axios from "../services/Axios";
import Sidebar from "../components/Sidebar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings/my-bookings").then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="min-h-screen flex bg-black text-white">
      <Sidebar />
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-blue-400 mb-6">My Bookings</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-[#1f1f1f] border border-[#2d2d2d] p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold">{b.event?.title}</h3>
              <p className="text-sm text-gray-400">{b.event?.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Booked on: {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
