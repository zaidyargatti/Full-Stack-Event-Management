import { useEffect, useState } from "react";
import axios from "../services/Axios";
import Sidebar from "../components/Sidebar";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    totalSeats: 10,
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = () => {
    axios.get("/events").then((res) => setEvents(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`/events/${editingId}`, form);
      } else {
        await axios.post("/events", form);
      }

      fetchEvents();
      setForm({ title: "", description: "", date: "", totalSeats: 10 });
      setEditMode(false);
      setEditingId(null);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to save event");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/events/${id}`);
    fetchEvents();
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16), // format for datetime-local
      totalSeats: event.totalSeats,
    });
    setEditMode(true);
    setEditingId(event._id);
  };

  const handleCancelEdit = () => {
    setForm({ title: "", description: "", date: "", totalSeats: 10 });
    setEditMode(false);
    setEditingId(null);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex bg-black text-white">
      <Sidebar />
      <div className="flex-1 p-10 space-y-10">
        <div>
          <h2 className="text-3xl font-bold text-blue-400 mb-4">
            {editMode ? "Edit Event" : "Create Event"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a]"
          >
            <input
              placeholder="Title"
              className="p-3 bg-[#222] text-white rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              placeholder="Description"
              className="p-3 bg-[#222] text-white rounded"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
            <input
              type="datetime-local"
              className="p-3 bg-[#222] text-white rounded"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
            <input
              type="number"
              min={1}
              placeholder="Total Seats"
              className="p-3 bg-[#222] text-white rounded"
              value={form.totalSeats}
              onChange={(e) =>
                setForm({ ...form, totalSeats: +e.target.value })
              }
              required
            />

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded"
              >
                {editMode ? "Update Event" : "Add Event"}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-red-400 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-300 mb-3">
            Existing Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((e) => (
              <div
                key={e._id}
                className="bg-[#1a1a1a] p-4 border border-[#2a2a2a] rounded-lg flex justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold">{e.title}</h3>
                  <p className="text-sm text-gray-400">{e.description}</p>
                  <p className="text-xs text-gray-500">
                    Available: {e.availableSeats}
                  </p>
                </div>
                <div className="flex flex-col justify-between items-end gap-2">
                  <button
                    onClick={() => handleEdit(e)}
                    className="text-yellow-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
