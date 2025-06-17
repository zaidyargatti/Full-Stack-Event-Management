import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-[#111] text-white w-64 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <div className="text-lg font-bold mb-8">
          {user?.name}
          <span className="block text-sm text-blue-400">{user?.role}</span>
        </div>

        <nav className="flex flex-col gap-4">
          <Link to="/" className="hover:text-blue-400">🏠 Dashboard</Link>
          {user?.role === "user" && (
            <Link to="/my-bookings" className="hover:text-blue-400">📖 My Bookings</Link>
          )}
          {user?.role === "admin" && (
            <>
              <Link to="/admin/events" className="hover:text-blue-400">🎯 Manage Events</Link>
              <Link to="/admin/analytics" className="hover:text-blue-400">📊 Analytics</Link>
            </>
          )}
        </nav>
      </div>

      <div className="text-sm">
        <button
          onClick={logout}
          className="text-red-400 hover:underline mb-3 block"
        >
          🔓 Logout
        </button>
        <a href="#" className="text-gray-400 hover:text-blue-300">❓ Help</a>
      </div>
    </div>
  );
}
