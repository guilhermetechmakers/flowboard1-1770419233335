import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { MainLayout } from '@/layouts/main-layout'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { LandingPage } from '@/pages/landing'
import { LoginPage } from '@/pages/auth/login'
import { SignupPage } from '@/pages/auth/signup'
import { PasswordResetPage } from '@/pages/auth/password-reset'
import { EmailVerifyPage } from '@/pages/auth/email-verify'
import { DashboardPage } from '@/pages/dashboard'
import { BoardPage } from '@/pages/board'
import { NodeDetailPage } from '@/pages/node-detail'
import { TemplatesPage } from '@/pages/templates'
import { ImportExportPage } from '@/pages/import-export'
import { SettingsPage } from '@/pages/settings'
import { HelpPage } from '@/pages/help'
import { AdminDashboardPage } from '@/pages/admin'
import { ProfilePage } from '@/pages/profile'
import { CheckoutPage } from '@/pages/checkout'
import { BillingPage } from '@/pages/billing'
import { PrivacyPage } from '@/pages/privacy'
import { TermsPage } from '@/pages/terms'
import { NotFoundPage } from '@/pages/not-found'
import { ServerErrorPage } from '@/pages/server-error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'password-reset', element: <PasswordResetPage /> },
      { path: 'verify-email', element: <EmailVerifyPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'overview', element: <Navigate to="/dashboard" replace /> },
      { path: 'projects/:projectId/boards/:boardId', element: <BoardPage /> },
      { path: 'projects/:projectId/boards/:boardId/nodes/:nodeId', element: <NodeDetailPage /> },
      { path: 'templates', element: <TemplatesPage /> },
      { path: 'import-export', element: <ImportExportPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'settings/:section', element: <SettingsPage /> },
      { path: 'help', element: <HelpPage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'billing', element: <BillingPage /> },
    ],
  },
  { path: '/404', element: <NotFoundPage /> },
  { path: '/500', element: <ServerErrorPage /> },
  { path: '*', element: <NotFoundPage /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
