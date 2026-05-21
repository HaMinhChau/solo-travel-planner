import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

// POST /api/auth/register
export const register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already used' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashed })

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/auth/me  (protected)
export const getMe = async (req, res) => {
  res.json(req.user)
}