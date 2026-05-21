import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../services/api'

export default function CreateTrip() {
  const [destinations, setDestinations] = useState([])
  const [form, setForm] = useState({
    destinationId: '',
    startDate: '',
    endDate: '',
    totalBudget: '',
    note: ''
  })
  const [error, setError]       = useState('')
  const navigate                = useNavigate()
  const [searchParams]          = useSearchParams()

  useEffect(() => {
    api.get('/destinations').then(({ data }) => {
      setDestinations(data)
      const preselect = searchParams.get('destinationId')
      if (preselect) setForm(f => ({ ...f, destinationId: preselect }))
    })
  }, [])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/trips', form)
      navigate('/my-trips')
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra')
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-emerald-600 text-sm mb-4 hover:underline">
        ← Quay lại
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tạo kế hoạch mới</h1>

      {error && (
        <p className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Điểm đến</label>
          <select
            name="destinationId"
            value={form.destinationId}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">-- Chọn điểm đến --</option>
            {destinations.map(d => (
              <option key={d._id} value={d._id}>{d.title} — {d.city}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Ngày bắt đầu</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Ngày kết thúc</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Ngân sách (VNĐ)</label>
          <input
            type="number"
            name="totalBudget"
            value={form.totalBudget}
            onChange={handleChange}
            placeholder="VD: 2000000"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Ghi chú</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Ghi chú thêm..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition"
        >
          Tạo kế hoạch
        </button>
      </form>
    </div>
  )
}