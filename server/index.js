import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import destinationRoutes from './routes/destinationRoutes.js'
import tripRoutes from './routes/tripRoutes.js'  

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/trips',        tripRoutes)    

app.get('/', (req, res) => res.send('API is running'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  })
  .catch(err => console.error(err))

  app.use('/api/users', (req, res, next) => {
  req.url = '/all-users'
  authRoutes(req, res, next)
})