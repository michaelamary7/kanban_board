import express from 'express';
import jwt from 'jsonwebtoken';
import User from './models/User'; // Adjust path as necessary
import { Request, Response } from 'express';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  // Invalidate the token logic here (if necessary)
  res.json({ message: 'Logged out successfully' });
});

export default router;
