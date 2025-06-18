import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

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
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(user);
    res.status(200).json({ token, user: { name: user.name, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
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

export {
registerUser,
loginUser,
getMe
}