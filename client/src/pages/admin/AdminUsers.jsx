import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function AdminUsers() {
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)
  const navigate              = useNavigate()

  useEffect(() => {
    api.get('/users').then(({ data }) => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="text-center py-20 text-gray-400">Đang tải...</p>

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/admin')} className="text-emerald-600 hover:underline text-sm">
          ← Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Users</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-6 py-4 font-medium">Username</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Ngày tạo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{user.username}</td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${user.role === 'admin'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-gray-100 text-gray-500'
                    }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}