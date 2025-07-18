import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../services/Axios";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0D8ABC&color=fff`;

  const [editableName, setEditableName] = useState(user?.name || "");
  const [isEditingName, setIsEditingName] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePic || defaultAvatar);
  const fileInputRef = useRef(null);

  const handleNameChange = (e) => setEditableName(e.target.value);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await axios.post("/auth/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfilePic(res.data.profilePic);
    } catch (err) {
      console.error("Profile pic upload failed:", err.response?.data || err);
    }
  };

  return (
    <div className="bg-[#111] text-white w-64 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-8">
          {/* Profile Picture */}
          <div className="relative group">
            <img
              src={profilePic}
              alt="Profile"
              onError={(e) => (e.target.src = defaultAvatar)}
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-400 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleProfilePicChange}
            />
            <span className="text-xs text-gray-400 mt-1 hidden group-hover:block text-center">Click to change</span>
          </div>

          {/* Editable Name */}
          <div className="mt-4 text-center">
            {isEditingName ? (
              <input
                type="text"
                value={editableName}
                onChange={handleNameChange}
                onBlur={() => {
                  setIsEditingName(false);
                  // TODO: Save name to backend
                }}
                className="bg-[#222] border border-blue-400 text-white text-sm rounded px-2 py-1 w-full text-center"
                autoFocus
              />
            ) : (
              <div
                className="text-lg font-bold cursor-pointer"
                onClick={() => setIsEditingName(true)}
                title="Click to edit name"
              >
                {editableName}
              </div>
            )}
            <span className="block text-sm text-blue-400">{user?.role}</span>
          </div>
        </div>

        {/* Navigation */}
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

      {/* Footer */}
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
