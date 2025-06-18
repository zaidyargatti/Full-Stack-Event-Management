import { useState } from "react";
import axios from "../services/Axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminKey: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", form);
      login(res.data);
    } catch (err) {
      setError( "Email or Passowrd Invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-semibold text-blue-500 mb-6 text-center tracking-wide">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg border border-[#333] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg border border-[#333] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg border border-[#333] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Admin Key (leave blank if user)"
            className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg border border-[#333] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, adminKey: e.target.value })}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
