import { Navigate, Route, Routes } from 'react-router-dom'
import RequireAuth from './features/auth/RequireAuth'
import SignInPage from './features/auth/SignInPage'
import DepartmentsPage from './features/departments/DepartmentsPage'
import FormPage from './features/forms/FormPage'
import DashboardPage from './features/dashboard/DashboardPage'
import ProfilePage from './features/profile/ProfilePage'
import { AboutPage, FaqPage, ReportProblemPage, NotFoundPage } from './features/misc/StaticPages'

/**
 * ROUTES
 * -------
 * Every URL the app responds to is listed here, once. Adding a new
 * top-level page means adding one <Route> below — it does not affect
 * any existing route.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/portal" replace />} />
      <Route path="/sign-in" element={<SignInPage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/report-a-problem" element={<ReportProblemPage />} />

      <Route
        path="/portal"
        element={
          <RequireAuth>
            <DepartmentsPage />
          </RequireAuth>
        }
      />
      
      <Route
        path="/portal/:departmentId/forms/:formId"
        element={
          <RequireAuth>
            <FormPage />
          </RequireAuth>
        }
      />

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        }
      />
      <Route path="/settings" element={<Navigate to="/profile" replace />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
