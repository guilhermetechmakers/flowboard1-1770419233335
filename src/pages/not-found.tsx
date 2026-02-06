import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Home } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md animate-in-up">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-xl text-muted-foreground">Page not found</p>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button type="button" variant="primary">
              <Home className="h-4 w-4" />
              Go home
            </Button>
          </Link>
          <div className="relative max-w-xs mx-auto sm:mx-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" aria-label="Search" />
          </div>
        </div>
      </div>
    </div>
  )
}
