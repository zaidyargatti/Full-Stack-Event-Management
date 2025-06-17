import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../services/Axios";
import StatCard from "../components/StatCard";
import EventCard from "../components/EventCard";

export default function Dashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (user?.role === "user") {
      axios.get("/events").then((res) => setEvents(res.data));
    }
    if (user?.role === "admin") {
      axios.get("/admin/analytics").then((res) => setStats(res.data));
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1 p-10 bg-[#0a0a0a]">
        <h1 className="text-2xl font-bold mb-6 text-blue-500">
          Good {new Date().getHours() < 12 ? "morning" : "evening"}, {user.name}
        </h1>

        {user.role === "user" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}

        {user.role === "admin" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard label="Total Events" value={stats?.totalEvents || 0} />
              <StatCard label="Total Bookings" value={stats?.totalSeatsBooked || 0} />
              <StatCard
                label="Highest % Occupancy"
                value={
                  stats?.seatsBookedPerEvent?.[0]?.percentOccupied?.toFixed(1) + "%" || "0%"
                }
                sublabel={stats?.seatsBookedPerEvent?.[0]?.eventTitle}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-blue-400">Events Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {stats?.seatsBookedPerEvent?.map((e, i) => (
                  <div key={i} className="bg-[#111] p-4 rounded-lg shadow text-sm">
                    <p className="font-semibold text-white">{e.eventTitle}</p>
                    <p className="text-gray-400">Booked: {e.bookedSeats}</p>
                    <p className="text-gray-400">Occupancy: {e.percentOccupied.toFixed(1)}%</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
