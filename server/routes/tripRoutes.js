import express from 'express'
import { getTrips, createTrip, updateTrip, deleteTrip } from '../controllers/tripController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect) // tất cả trip routes đều cần login

router.get('/',    getTrips)
router.post('/',   createTrip)
router.put('/:id', updateTrip)
router.delete('/:id', deleteTrip)

export default router