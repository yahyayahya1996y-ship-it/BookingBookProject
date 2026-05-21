import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import NotFound from "../pages/errors/NotFound";
import { Unauthorized } from "../pages/errors/Unauthorized";

// Layouts
import { AuthLayout } from "../layouts/AuthLayout";
import MainLayout from "../components/layout/MainLayout";

// Route Guards
import RoleRoute from "./RoleRoute";

// User Pages
import UserDashboard from "../pages/user/UserDashboard";
import UserBooksPage from "../pages/user/UserBooksPage";
import { MyBookings } from "../pages/user/MyBookings";
import { UserProfile } from "../pages/user/UserProfile";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminBooksPage from "../pages/admin/AdminBooksPage";
import { ManageBookings } from "../pages/admin/ManageBookings";
import { ManageUsers } from "../pages/admin/ManageUsers";
import { ActivityLog } from "../pages/admin/ActivityLog";

// Route Guards
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Error Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute />}>
        {/* User Routes - Protected with Role */}
        <Route element={<MainLayout />}>
          <Route element={<RoleRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/books" element={<UserBooksPage />} />
            <Route path="/user/my-bookings" element={<MyBookings />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* Admin Routes - Protected with Role */}
        <Route element={<MainLayout />}>
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/activity-log" element={<ActivityLog />} />
          </Route>
        </Route>
      </Route>

      {/* Catch All - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;