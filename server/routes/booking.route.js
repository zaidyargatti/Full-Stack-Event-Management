import express from 'express';
import { bookSeat, getUserBookings } from '../controllers/booking.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/:id/book', protect, bookSeat);
router.get('/my-bookings', protect, getUserBookings);

export default router;
