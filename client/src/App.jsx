import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import MyTrips from './pages/MyTrips'
import CreateTrip from './pages/CreateTrip'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDestinations from './pages/admin/AdminDestinations'
import AdminUsers from './pages/admin/AdminUsers'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>
          } />
          <Route path="/destinations" element={
            <ProtectedRoute><MainLayout><Destinations /></MainLayout></ProtectedRoute>
          } />
          <Route path="/destinations/:id" element={
            <ProtectedRoute><MainLayout><DestinationDetail /></MainLayout></ProtectedRoute>
          } />
          <Route path="/my-trips" element={
            <ProtectedRoute><MainLayout><MyTrips /></MainLayout></ProtectedRoute>
          } />
          <Route path="/my-trips/create" element={
            <ProtectedRoute><MainLayout><CreateTrip /></MainLayout></ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin" element={
            <AdminRoute><MainLayout><AdminDashboard /></MainLayout></AdminRoute>
          } />
          <Route path="/admin/destinations" element={
            <AdminRoute><MainLayout><AdminDestinations /></MainLayout></AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute><MainLayout><AdminUsers /></MainLayout></AdminRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}