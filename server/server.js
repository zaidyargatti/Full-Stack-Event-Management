import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/auth.route.js';
 import eventRoutes from './routes/event.route.js';
 import bookingRoutes from './routes/booking.route.js';
import adminRoutes from './routes/admin.route.js';
import connectDB from './config/db.config.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', router);
 app.use('/api/events', eventRoutes);
  app.use('/api/bookings', bookingRoutes);
 app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})