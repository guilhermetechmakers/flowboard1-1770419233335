import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export function ServerErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md animate-in-up">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20 text-destructive">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-foreground">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">We're sorry. An error occurred on our end. Please try again or contact support.</p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button type="button" variant="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
          <Link to="/">
            <Button type="button" variant="outline">Go home</Button>
          </Link>
          <a href="#support">
            <Button type="button" variant="ghost">Contact support</Button>
          </a>
        </div>
      </div>
    </div>
  )
}
