import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export function MainLayout() {
  return (
    <>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Toaster position="top-right" richColors closeButton />
    </>
  )
}
