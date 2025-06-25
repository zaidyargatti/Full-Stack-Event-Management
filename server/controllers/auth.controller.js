import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import client from '../config/client.js';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

 const registerUser = async (req, res) => {
  const { name, email, password, adminKey } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    // 🔐 Only use admin role if adminKey matches
    let role = 'user';
    if (adminKey && adminKey === process.env.ADMIN_KEY) {
      role = 'admin';
    }

    const user = await User.create({ name, email, password: hashed, role });

    const token = generateToken(user);
    res.status(201).json({ token, user: { name, email, role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // 3. Prepare Redis cache key
    const redisKey = `user:${email}`;
    const userData = { name: user.name, email: user.email, role: user.role };

    // 4. Set Redis cache if Redis is connected
    if (client.status === 'ready') {
      await client.set(redisKey, JSON.stringify(userData), 'EX', 60 * 60 * 24);
    }

    // 5. Generate token and respond
    const token = generateToken(user);
    res.status(200).json({ token, user: userData });

  } catch (err) {
    console.error('Login Error:', err); // Log the full error on server
    res.status(500).json({ msg: 'Server Error: ' + err.message });
  }
};


const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;
    const imageUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl },
      { new: true }
    );

    res.json({ profilePic: user.profilePic });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ msg: "Failed to upload image" });
  }
};

export {
registerUser,
loginUser,
getMe,
uploadProfilePic
}