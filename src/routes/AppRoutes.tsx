import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import { AuthLayout } from '../layouts/AuthLayout'
import { UserLayout } from '../layouts/UserLayout'
import { AdminLayout } from '../layouts/AdminLayout'

// Auth Pages
import { Login } from '../pages/auth/Login'

// User Pages
import { UserDashboard } from '../pages/user/UserDashboard'
import { AvailableBooks } from '../pages/user/AvailableBooks'
import { BookDetails } from '../pages/user/BookDetails'
import { MyBookings } from '../pages/user/MyBookings'
import { UserProfile } from '../pages/user/UserProfile'

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { ManageBooks } from '../pages/admin/ManageBooks'
import { AddBook } from '../pages/admin/AddBook'
import { EditBook } from '../pages/admin/EditBook'
import { ManageBookings } from '../pages/admin/ManageBookings'
import { ManageUsers } from '../pages/admin/ManageUsers'
import { ActivityLog } from '../pages/admin/ActivityLog'

// Error Pages
import { Unauthorized } from '../pages/errors/Unauthorized'
import { NotFound } from '../pages/errors/NotFound'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/books" element={<AvailableBooks />} />
        <Route path="/user/books/:id" element={<BookDetails />} />
        <Route path="/user/my-bookings" element={<MyBookings />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<ManageBooks />} />
        <Route path="/admin/books/add" element={<AddBook />} />
        <Route path="/admin/books/edit/:id" element={<EditBook />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/activity-log" element={<ActivityLog />} />
      </Route>

      {/* Error Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Default Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
