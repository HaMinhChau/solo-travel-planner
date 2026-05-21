import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-emerald-600 text-white rounded-2xl px-10 py-20 text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Khám phá Việt Nam theo cách của bạn
        </h1>
        <p className="text-emerald-100 text-lg mb-8">
          Lên kế hoạch du lịch solo thông minh, an toàn và tiết kiệm
        </p>
        <Link
          to="/destinations"
          className="bg-white text-emerald-600 font-semibold px-8 py-3 rounded-full hover:bg-emerald-50 transition"
        >
          Khám phá ngay
        </Link>
      </div>

      {/* Category Cards */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh mục nổi bật</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Bãi biển',       emoji: '🏖️' },
          { label: 'Núi rừng',       emoji: '🏔️' },
          { label: 'Lịch sử',        emoji: '🏛️' },
          { label: 'Ẩm thực',        emoji: '🍜' },
        ].map((cat) => (
          <Link
            key={cat.label}
            to={`/destinations?category=${cat.label}`}
            className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <div className="text-4xl mb-2">{cat.emoji}</div>
            <div className="font-medium text-gray-700">{cat.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}