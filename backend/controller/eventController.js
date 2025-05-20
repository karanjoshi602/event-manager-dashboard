
const eventModel = require('../model/eventModel');

exports.getEvents = async (req, res) => {
  try {
    const events = await eventModel.getAllEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await eventModel.getEventById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await eventModel.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await eventModel.updateEvent(req.params.id, req.body);
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await eventModel.deleteEvent(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
