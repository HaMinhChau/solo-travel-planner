import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function MyTrips() {
  const [trips, setTrips]     = useState([])
  const [loading, setLoading] = useState(true)
  const navigate              = useNavigate()

  const fetchTrips = async () => {
    try {
      const { data } = await api.get('/trips')
      setTrips(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTrips() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Xoá kế hoạch này?')) return
    await api.delete(`/trips/${id}`)
    setTrips(trips.filter(t => t._id !== id))
  }

  if (loading) return <p className="text-center py-20 text-gray-400">Đang tải...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Kế hoạch của tôi</h1>
        <button
          onClick={() => navigate('/my-trips/create')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl font-medium transition"
        >
          + Tạo kế hoạch
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-4">Bạn chưa có kế hoạch nào</p>
          <button
            onClick={() => navigate('/destinations')}
            className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition"
          >
            Khám phá điểm đến
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <div key={trip._id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <img
                src={trip.destinationId?.image}
                alt={trip.destinationId?.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {trip.destinationId?.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      📍 {trip.destinationId?.city}
                    </p>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                    {trip.destinationId?.category}
                  </span>
                </div>

                <div className="mt-4 flex gap-4 text-sm text-gray-500">
                  <span>🗓 {new Date(trip.startDate).toLocaleDateString('vi-VN')}</span>
                  <span>→</span>
                  <span>{new Date(trip.endDate).toLocaleDateString('vi-VN')}</span>
                </div>

                <p className="text-emerald-600 font-bold mt-2">
                  {trip.totalBudget.toLocaleString('vi-VN')} ₫
                </p>

                {trip.note && (
                  <p className="text-sm text-gray-400 mt-2 italic">"{trip.note}"</p>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/my-trips/edit/${trip._id}`)}
                    className="flex-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-50 py-2 rounded-xl text-sm font-medium transition"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="flex-1 border border-red-400 text-red-400 hover:bg-red-50 py-2 rounded-xl text-sm font-medium transition"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}