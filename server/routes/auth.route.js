import express from 'express';
import { registerUser, loginUser, getMe ,uploadProfilePic} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/mult.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post("/upload-profile", protect, upload.single("profilePic"), uploadProfilePic);

export default router;
