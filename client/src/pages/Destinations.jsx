import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../services/api'

const CATEGORIES = ['Tất cả', 'Bãi biển', 'Núi rừng', 'Lịch sử', 'Ẩm thực']

export default function Destinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'Tất cả'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const params = {}
        if (activeCategory !== 'Tất cả') params.category = activeCategory
        if (search) params.search = search
        const { data } = await api.get('/destinations', { params })
        setDestinations(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [activeCategory, search])

  return (
    <div>
      <input
        type="text"
        placeholder="🔍 Tìm kiếm điểm đến..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-5 py-3 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />

      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSearchParams(cat === 'Tất cả' ? {} : { category: cat })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${activeCategory === cat
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-20">Đang tải...</p>
      ) : destinations.length === 0 ? (
        <p className="text-center text-gray-400 py-20">Không tìm thấy kết quả</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest._id}
              to={`/destinations/${dest._id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                  {dest.category}
                </span>
                <h3 className="font-bold text-gray-800 mt-2">{dest.title}</h3>
                <p className="text-sm text-gray-500 mt-1">📍 {dest.city}</p>
                <p className="text-sm text-emerald-600 font-semibold mt-2">
                  {dest.budget.toLocaleString('vi-VN')} ₫
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}