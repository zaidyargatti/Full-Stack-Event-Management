import Booking from '../models/booking.model.js';
import Event from '../models/event.model.js';
import mongoose from 'mongoose';

 const bookSeat = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const event = await Event.findById(req.params.id).session(session);
    if (!event) throw new Error('Event not found');

    if (event.availableSeats <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ msg: 'No seats available' });
    }

    const alreadyBooked = await Booking.findOne({ event: event._id, user: req.user.id });
    if (alreadyBooked) {
      await session.abortTransaction();
      return res.status(400).json({ msg: 'You have already booked this event' });
    }

    await Event.updateOne(
      { _id: event._id, availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } }
    ).session(session);

    
    const booking = await Booking.create([{ event: event._id, user: req.user.id }], { session });

    await session.commitTransaction();
    res.status(201).json(booking[0]);
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ msg: err.message });
  } finally {
    session.endSession();
  }
};

 const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export {
    bookSeat,
    getUserBookings
}