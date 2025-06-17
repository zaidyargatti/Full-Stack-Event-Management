import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/Axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const loadUser = async () => {
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
