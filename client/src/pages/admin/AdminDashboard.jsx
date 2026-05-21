import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()

  const cards = [
    { label: 'Quản lý Destinations', icon: '🗺️', path: '/admin/destinations' },
    { label: 'Quản lý Users',        icon: '👥', path: '/admin/users' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card) => (
          <button
            key={card.path}
            onClick={() => navigate(card.path)}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left"
          >
            <div className="text-4xl mb-3">{card.icon}</div>
            <div className="font-semibold text-gray-700 text-lg">{card.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}