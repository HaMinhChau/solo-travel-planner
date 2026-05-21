import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function DestinationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dest, setDest] = useState(null)

  useEffect(() => {
    api.get(`/destinations/${id}`)
      .then(({ data }) => setDest(data))
      .catch(() => navigate('/destinations'))
  }, [id])

  if (!dest) return <p className="text-center py-20 text-gray-400">Đang tải...</p>

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-emerald-600 text-sm mb-4 hover:underline"
      >
        ← Quay lại
      </button>

      <img
        src={dest.image}
        alt={dest.title}
        className="w-full h-72 object-cover rounded-2xl mb-6"
      />

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
            {dest.category}
          </span>
          <span className="text-sm text-gray-400">📍 {dest.city}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">{dest.title}</h1>
        <p className="text-gray-600 leading-relaxed mb-6">{dest.description}</p>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm text-gray-400">Ngân sách ước tính</p>
            <p className="text-2xl font-bold text-emerald-600">
              {dest.budget.toLocaleString('vi-VN')} ₫
            </p>
          </div>
          <button
            onClick={() => navigate('/my-trips')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            + Thêm vào kế hoạch
          </button>
        </div>
      </div>
    </div>
  )
}