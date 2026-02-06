import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { FolderKanban, Mail, Lock, User, Building2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  org: z.string().optional(),
  terms: z.boolean().refine((v) => v === true, { message: 'You must accept the terms' }),
})

type FormData = z.infer<typeof schema>

export function SignupPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', org: '', terms: false },
  })

  const onSubmit = async (_data: FormData) => {
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      toast.success('Account created. Please verify your email.')
      navigate('/verify-email')
    } catch {
      toast.error('Sign up failed. Try again.')
    } finally {
      setIsLoading(false)
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
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your details to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" placeholder="Your name" className="pl-9" hasError={!!errors.name} {...register('name')} />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-9" hasError={!!errors.email} {...register('email')} />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-9" hasError={!!errors.password} {...register('password')} />
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="org">Organization (optional)</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="org" placeholder="Company name" className="pl-9" {...register('org')} />
                </div>
              </div>
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox className="mt-0.5" {...register('terms')} />
                <span>
                  I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.terms && <p className="text-sm text-destructive">{errors.terms.message}</p>}
              <Button type="submit" className="w-full" isLoading={isLoading} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Sign up
              </Button>
            </form>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" className="w-full" disabled>Google</Button>
              <Button type="button" variant="outline" className="w-full" disabled>Microsoft</Button>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
