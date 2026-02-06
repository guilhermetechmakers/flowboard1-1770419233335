import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderKanban, Mail, Lock, Loader2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

const requestSchema = z.object({ email: z.string().email('Invalid email') })
const confirmSchema = z.object({
  password: z.string().min(8, 'At least 8 characters'),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] })

type RequestData = z.infer<typeof requestSchema>
type ConfirmData = z.infer<typeof confirmSchema>

export function PasswordResetPage() {
  const [step, setStep] = useState<'request' | 'confirm' | 'success'>('request')
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const requestForm = useForm<RequestData>({
    resolver: zodResolver(requestSchema),
  })
  const confirmForm = useForm<ConfirmData>({
    resolver: zodResolver(confirmSchema),
  })

  const onRequest = async (_data: RequestData) => {
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      toast.success('Check your email for a reset link')
      setStep('confirm')
      setToken('mock-token')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const onConfirm = async (_data: ConfirmData) => {
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      toast.success('Password updated')
      setStep('success')
    } catch {
      toast.error('Reset failed')
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md animate-in-up">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-accent" />
            <h2 className="mt-4 text-xl font-semibold">Password reset complete</h2>
            <p className="mt-2 text-muted-foreground">You can now sign in with your new password.</p>
            <Link to="/login"><Button type="button" className="mt-6">Sign in</Button></Link>
          </CardContent>
        </Card>
      </div>
    )
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
          <CardHeader>
            <CardTitle>{step === 'request' ? 'Reset password' : 'Set new password'}</CardTitle>
            <CardDescription>
              {step === 'request'
                ? 'Enter your email and we\'ll send a reset link.'
                : 'Enter your new password below.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'request' ? (
              <form onSubmit={requestForm.handleSubmit(onRequest)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-9"
                      hasError={!!requestForm.formState.errors.email}
                      {...requestForm.register('email')}
                    />
                  </div>
                  {requestForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{requestForm.formState.errors.email.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" isLoading={isLoading} disabled={isLoading}>
                  Send reset link
                </Button>
              </form>
            ) : (
              <form onSubmit={confirmForm.handleSubmit(onConfirm)} className="space-y-4">
                <input type="hidden" value={token} readOnly />
                <div className="space-y-2">
                  <Label htmlFor="password">New password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      hasError={!!confirmForm.formState.errors.password}
                      {...confirmForm.register('password')}
                    />
                  </div>
                  {confirmForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{confirmForm.formState.errors.password.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="••••••••"
                    hasError={!!confirmForm.formState.errors.confirm}
                    {...confirmForm.register('confirm')}
                  />
                  {confirmForm.formState.errors.confirm && (
                    <p className="text-sm text-destructive">{confirmForm.formState.errors.confirm.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" isLoading={isLoading} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Update password
                </Button>
              </form>
            )}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-primary hover:underline">Back to sign in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
