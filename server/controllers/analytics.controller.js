import Event from '../models/event.model.js';
import Booking from '../models/booking.model.js';

 const getAdminAnalytics = async (req, res) => {
  try {
    const events = await Event.find();
    const totalEvents = events.length;

    const totalSeatsBooked = await Booking.countDocuments();

    const seatsBookedPerEvent = await Booking.aggregate([
      {
        $group: {
          _id: '$event',
          total: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: '_id',
          as: 'event'
        }
      },
      { $unwind: '$event' },
      {
        $project: {
          _id: 0,
          eventTitle: '$event.title',
          totalSeats: '$event.totalSeats',
          bookedSeats: '$total',
          percentOccupied: {
            $multiply: [{ $divide: ['$total', '$event.totalSeats'] }, 100]
          }
        }
      }
    ]);

    res.json({
      totalEvents,
      totalSeatsBooked,
      seatsBookedPerEvent
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


export {
getAdminAnalytics
}
