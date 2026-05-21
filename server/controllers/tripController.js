import Trip from '../models/Trip.js'

// GET /api/trips — lấy trips của user đang login
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id })
      .populate('destinationId', 'title image city category budget')
      .sort({ createdAt: -1 })
    res.json(trips)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/trips
export const createTrip = async (req, res) => {
  try {
    const { destinationId, startDate, endDate, totalBudget, note } = req.body
    const trip = await Trip.create({
      userId: req.user._id,
      destinationId,
      startDate,
      endDate,
      totalBudget,
      note
    })
    const populated = await trip.populate('destinationId', 'title image city category budget')
    res.status(201).json(populated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/trips/:id
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user._id })
    if (!trip) return res.status(404).json({ message: 'Trip not found' })

    Object.assign(trip, req.body)
    await trip.save()
    res.json(trip)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/trips/:id
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
    if (!trip) return res.status(404).json({ message: 'Trip not found' })
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}