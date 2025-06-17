import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventDetails from './pages/EventDetails';
import MyBookings from './pages/MyBookings';
import AdminEvents from './pages/AdminEvents';
import Analytics from './pages/Analytics';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/event/:id" element={user ? <EventDetails /> : <Navigate to="/" />} />
      <Route path="/my-bookings" element={user?.role === 'user' ? <MyBookings /> : <Navigate to="/dashboard" />} />
      <Route path="/admin/events" element={user?.role === 'admin' ? <AdminEvents /> : <Navigate to="/dashboard" />} />
      <Route path="/admin/analytics" element={user?.role === 'admin' ? <Analytics /> : <Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;



































// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// // import Dashboard from './pages/Dashboard';
// // import EventDetails from './pages/EventDetails';
// // import MyBookings from './pages/MyBookings';
// // import AdminEvents from './pages/AdminEvents';
// // import Analytics from './pages/Analytics';
// // import Navbar from './components/Navbar';

// function App() {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         {/* <Route path="/login" element={<Login />} /> */}
//         <Route path="/register" element={<Register />} />
//         {/* <Route path="/event/:id" element={<EventDetails />} />
//         <Route path="/my-bookings" element={<MyBookings />} />
//         <Route path="/admin/events" element={<AdminEvents />} />
//         <Route path="/admin/analytics" element={<Analytics />} /> */}
//       </Routes>
//     </>
//   );
// }

// export default App;
