import Event from "../models/event.model.js";

 const createEvent = async (req, res) => {
  try {
    const { title, description, date, totalSeats } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      totalSeats,
      availableSeats: totalSeats,
      createdBy: req.user.id
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

 const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

 const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(404).json({ msg: 'Event not found' });
  }
};

 const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

 const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

export {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
}