import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const EMPTY = { title: '', image: '', city: '', description: '', category: 'Bãi biển', budget: '' }
const CATEGORIES = ['Bãi biển', 'Núi rừng', 'Lịch sử', 'Ẩm thực']

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState([])
  const [form, setForm]                 = useState(EMPTY)
  const [editId, setEditId]             = useState(null)
  const [showForm, setShowForm]         = useState(false)
  const navigate                        = useNavigate()

  const fetchAll = async () => {
    const { data } = await api.get('/destinations')
    setDestinations(data)
  }

  useEffect(() => { fetchAll() }, [])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) {
      await api.put(`/destinations/${editId}`, form)
    } else {
      await api.post('/destinations', form)
    }
    setForm(EMPTY)
    setEditId(null)
    setShowForm(false)
    fetchAll()
  }

  const handleEdit = (dest) => {
    setForm({
      title: dest.title,
      image: dest.image,
      city: dest.city,
      description: dest.description,
      category: dest.category,
      budget: dest.budget
    })
    setEditId(dest._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Xoá destination này?')) return
    await api.delete(`/destinations/${id}`)
    fetchAll()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin')} className="text-emerald-600 hover:underline text-sm">
            ← Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Destinations</h1>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setForm(EMPTY); setEditId(null) }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl font-medium transition"
        >
          {showForm ? 'Huỷ' : '+ Thêm mới'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm mb-8 space-y-4">
          <h2 className="font-semibold text-gray-700">
            {editId ? 'Chỉnh sửa Destination' : 'Thêm Destination mới'}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="title" value={form.title} onChange={handleChange}
              placeholder="Tên điểm đến" required
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <input
              name="city" value={form.city} onChange={handleChange}
              placeholder="Thành phố" required
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <input
            name="image" value={form.image} onChange={handleChange}
            placeholder="URL ảnh (dùng link từ unsplash.com)" required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <textarea
            name="description" value={form.description} onChange={handleChange}
            placeholder="Mô tả" required rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              name="category" value={form.category} onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <input
              name="budget" type="number" value={form.budget} onChange={handleChange}
              placeholder="Ngân sách (VNĐ)" required
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition"
          >
            {editId ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </form>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-6 py-4 font-medium">Tên</th>
              <th className="px-6 py-4 font-medium">Thành phố</th>
              <th className="px-6 py-4 font-medium">Danh mục</th>
              <th className="px-6 py-4 font-medium">Ngân sách</th>
              <th className="px-6 py-4 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {destinations.map((dest) => (
              <tr key={dest._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{dest.title}</td>
                <td className="px-6 py-4 text-gray-500">{dest.city}</td>
                <td className="px-6 py-4">
                  <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full text-xs">
                    {dest.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {dest.budget.toLocaleString('vi-VN')} ₫
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(dest)}
                      className="text-emerald-600 hover:underline text-xs font-medium"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(dest._id)}
                      className="text-red-400 hover:underline text-xs font-medium"
                    >
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}