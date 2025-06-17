import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { 
    type: String,
     required: true
     },
  description:{
    type:String
  },
  date: {
     type: Date,
      required: true 
    },
  totalSeats: { 
    type: Number, 
    required: true 
},
  availableSeats: {
     type: Number, 
     required: true 
    },
  createdBy: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User' }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;