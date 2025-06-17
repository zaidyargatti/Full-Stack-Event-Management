import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/event.controller.js';
import { protect, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, isAdmin, createEvent);

router.route('/:id')
  .get(getEventById)
  .put(protect, isAdmin, updateEvent)
  .delete(protect, isAdmin, deleteEvent);

export default router;
