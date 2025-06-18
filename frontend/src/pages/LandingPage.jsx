import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 bg-black">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-blue-500 mb-4 tracking-tight"
        >
          Event Management
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 max-w-2xl text-lg mb-8"
        >
          Book your favorite events instantly. Seamlessly manage bookings and analytics with our powerful admin dashboard.
        </motion.p>
        <motion.a
          href="/login"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg transition"
        >
          Get Started
        </motion.a>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-blue-400 text-center mb-12"
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-white mb-2">One-Click Booking</h3>
            <p className="text-gray-400 text-sm">
              Reserve your seat for any event with a single click. It's fast and hassle-free.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-white mb-2">Admin Dashboard</h3>
            <p className="text-gray-400 text-sm">
              Track bookings, manage events, and monitor analytics in real-time.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-white mb-2">Secure and Scalable</h3>
            <p className="text-gray-400 text-sm">
              Built using secure authentication and modern full-stack technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6  border-[#1f1f1f] text-gray-500 bg-black">
        &copy; {new Date().getFullYear()} Full Stack Event Management. All rights reserved.
      </footer>
    </div>
  );
}
