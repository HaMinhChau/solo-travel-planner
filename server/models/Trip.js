import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  startDate:     { type: Date, required: true },
  endDate:       { type: Date, required: true },
  totalBudget:   { type: Number, required: true },
  note:          { type: String, default: '' }
}, { timestamps: true })

export default mongoose.model('Trip', tripSchema)