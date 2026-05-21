import Destination from '../models/Destination.js'

// GET /api/destinations
export const getDestinations = async (req, res) => {
  try {
    const { city, category, search } = req.query
    const filter = {}

    if (city)     filter.city     = { $regex: city,     $options: 'i' }
    if (category) filter.category = category
    if (search)   filter.title    = { $regex: search,   $options: 'i' }

    const destinations = await Destination.find(filter).sort({ createdAt: -1 })
    res.json(destinations)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/destinations/:id
export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
    if (!destination) return res.status(404).json({ message: 'Not found' })
    res.json(destination)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/destinations (admin only)
export const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body)
    res.status(201).json(destination)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/destinations/:id (admin only)
export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    )
    if (!destination) return res.status(404).json({ message: 'Not found' })
    res.json(destination)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/destinations/:id (admin only)
export const deleteDestination = async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}