import { useEffect, useState } from "react";
import axios from "../services/Axios";
import Sidebar from "../components/Sidebar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/admin/analytics").then((res) => setData(res.data));
  }, []);

  if (!data) return null;

  // 🔵 Prepare Doughnut Data
  const chartData = {
    labels: data.seatsBookedPerEvent.map((e) => e.eventTitle),
    datasets: [
      {
        label: "Seats Booked",
        data: data.seatsBookedPerEvent.map((e) => e.bookedSeats),
        backgroundColor: [
          "#3b82f6", // blue
          "#9ca3af", // gray-400
          "#1f2937", // gray-900
          "#6366f1", // indigo
          "#4b5563", // gray-600
        ],
        borderColor: "#111827",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const total = data.totalSeatsBooked;

  return (
    <div className="min-h-screen flex bg-black text-white">
      <Sidebar />
      <div className="flex-1 p-10 space-y-8">
        <h2 className="text-3xl font-bold text-blue-400">Analytics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1f1f1f] p-4 rounded-xl text-center">
            <p className="text-sm text-gray-400">Total Events</p>
            <p className="text-xl font-bold text-blue-400">{data.totalEvents}</p>
          </div>
          <div className="bg-[#1f1f1f] p-4 rounded-xl text-center">
            <p className="text-sm text-gray-400">Total Bookings</p>
            <p className="text-xl font-bold text-blue-400">{total}</p>
          </div>
          <div className="bg-[#1f1f1f] p-4 rounded-xl text-center">
            <p className="text-sm text-gray-400">Highest % Occupancy</p>
            <p className="text-xl font-bold text-blue-400">
              {Math.max(...data.seatsBookedPerEvent.map(e => e.percentOccupied)).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-[#1f1f1f] p-6 rounded-xl border border-[#2a2a2a] max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-blue-300 mb-4 text-center">Booking Distribution</h3>
          <Doughnut data={chartData} />
          <p className="text-center text-sm text-gray-400 mt-4">
            Total Bookings: <span className="text-blue-400 font-bold">{total}</span>
          </p>
        </div>

        {/* Per Event Stats */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-2">Events Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.seatsBookedPerEvent.map((e, i) => (
              <div
                key={i}
                className="bg-[#1f1f1f] p-4 rounded-lg border border-[#2d2d2d]"
              >
                <p className="font-semibold">{e.eventTitle}</p>
                <p className="text-sm">Booked: {e.bookedSeats}</p>
                <p className="text-sm">
                  Occupancy: {e.percentOccupied.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
