import express from 'express'
import { register, login, getMe } from '../controllers/authController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', register)
router.post('/login',    login)
router.get('/me',        protect, getMe)

// Lấy tất cả users (admin only)
router.get('/all-users', protect, adminOnly, async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 })
  res.json(users)
})

export default router