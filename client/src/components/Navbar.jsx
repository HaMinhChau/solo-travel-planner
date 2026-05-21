import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-emerald-600 font-bold text-xl">
          🌏 SoloTravel
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/destinations" className="text-gray-600 hover:text-emerald-600 transition">
            Destinations
          </Link>

          {user ? (
            <>
              <Link to="/my-trips" className="text-gray-600 hover:text-emerald-600 transition">
                My Trips
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-gray-600 hover:text-emerald-600 transition">
                  Admin
                </Link>
              )}
              <span className="text-gray-400">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-emerald-600 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}   