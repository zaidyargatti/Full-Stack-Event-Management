import express from 'express';
import { getAdminAnalytics } from '../controllers/analytics.controller.js';
import { protect, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/analytics', protect, isAdmin, getAdminAnalytics);

export default router;
