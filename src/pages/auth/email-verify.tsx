import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FolderKanban, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function EmailVerifyPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'pending' | 'success' | 'failure'>(token ? 'pending' : 'failure')
  const [resending, setResending] = useState(false)

  useEffect(() => {
    if (!token) {
      setStatus('failure')
      return
    }
    const t = setTimeout(() => setStatus('success'), 1000)
    return () => clearTimeout(t)
  }, [token])

  const handleResend = async () => {
    setResending(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      toast.success('Verification email sent')
    } catch {
      toast.error('Failed to resend')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold text-foreground">
            <FolderKanban className="h-8 w-8 text-primary" />
            FlowBoard
          </Link>
        </div>
        <Card className="animate-in-up">
          <CardContent className="pt-6 text-center">
            {status === 'pending' && (
              <>
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <h2 className="mt-4 text-xl font-semibold">Verifying your email...</h2>
                <p className="mt-2 text-muted-foreground">Please wait.</p>
              </>
            )}
            {status === 'success' && (
              <>
                <CheckCircle className="mx-auto h-12 w-12 text-accent" />
                <h2 className="mt-4 text-xl font-semibold">Email verified</h2>
                <p className="mt-2 text-muted-foreground">Your account is ready. Continue to the dashboard.</p>
                <Link to="/dashboard"><Button type="button" className="mt-6">Continue to Dashboard</Button></Link>
              </>
            )}
            {status === 'failure' && (
              <>
                <XCircle className="mx-auto h-12 w-12 text-destructive" />
                <h2 className="mt-4 text-xl font-semibold">Verification failed</h2>
                <p className="mt-2 text-muted-foreground">The link may have expired or is invalid.</p>
                <Button variant="primary" className="mt-4" onClick={handleResend} disabled={resending}>
                  {resending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Resend verification email
                </Button>
                <Link to="/login"><Button type="button" variant="outline" className="mt-3 ml-2">Back to sign in</Button></Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
