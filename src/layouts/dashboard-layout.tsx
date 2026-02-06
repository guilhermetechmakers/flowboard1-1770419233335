import { useState, useCallback } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  LayoutTemplate,
  FileInput,
  Settings,
  HelpCircle,
  Shield,
  User,
  CreditCard,
  Receipt,
  Menu,
  X,
  Search,
  Bell,
  Plus,
  ChevronDown,
} from 'lucide-react'
import { Toaster } from 'sonner'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const SIDEBAR_KEY = 'flowboard-sidebar-collapsed'

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/templates', label: 'Templates', icon: LayoutTemplate },
  { to: '/dashboard/import-export', label: 'Import / Export', icon: FileInput },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  { to: '/dashboard/help', label: 'Help', icon: HelpCircle },
  { to: '/dashboard/admin', label: 'Admin', icon: Shield },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
  { to: '/dashboard/checkout', label: 'Checkout', icon: CreditCard },
  { to: '/dashboard/billing', label: 'Billing', icon: Receipt },
]

export function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSidebar = useCallback(() => {
    setCollapsed((c) => {
      const next = !c
      try {
        localStorage.setItem(SIDEBAR_KEY, String(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const isActive = (to: string) => {
    if (to === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(to)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <aside
        className={cn(
          'hidden md:flex flex-col border-r border-border bg-card shadow-card transition-all duration-300 ease-in-out',
          collapsed ? 'w-[72px]' : 'w-56'
        )}
      >
        <div className="flex h-14 items-center border-b border-border px-4">
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-foreground">
              <FolderKanban className="h-6 w-6 text-primary" />
              <span>FlowBoard</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={toggleSidebar}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronDown
              className={cn('h-4 w-4 transition-transform duration-200', collapsed && 'rotate-90')}
            />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-muted hover:text-foreground',
                isActive(to)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 md:hidden"
          aria-hidden
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - mobile drawer */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-56 flex-col border-r border-border bg-card shadow-card transition-transform duration-300 md:hidden',
          mobileOpen ? 'flex translate-x-0' : 'hidden -translate-x-full'
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            <FolderKanban className="h-6 w-6 text-primary" />
            FlowBoard
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                isActive(to) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-card px-4 shadow-card">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search projects, boards..."
              className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New project</span>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Link to="/dashboard/profile">
            <Button variant="ghost" size="icon" aria-label="Profile">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </header>
        <div className="flex-1 p-4 md:p-6">
          <Outlet />
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </div>
  )
}
