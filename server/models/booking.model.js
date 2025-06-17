import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
},
  event: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Event'
     },
  createdAt: { 
    type: Date,
     default: Date.now 
    }
});

 const Booking= mongoose.model('Booking', bookingSchema);
 export default Booking;
 
