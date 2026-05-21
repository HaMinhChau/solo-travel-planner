import mongoose from 'mongoose'

const destinationSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  image:       { type: String, required: true },
  city:        { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ['Bãi biển', 'Núi rừng', 'Lịch sử', 'Ẩm thực'], required: true },
  budget:      { type: Number, required: true }
}, { timestamps: true })

export default mongoose.model('Destination', destinationSchema)