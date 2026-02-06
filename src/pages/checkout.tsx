import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreditCard, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const plans = [
  { id: 'monthly', name: 'Monthly', price: 12, period: 'mo' },
  { id: 'annual', name: 'Annual', price: 120, period: 'yr', save: 'Save 17%' },
]

export function CheckoutPage() {
  const [plan, setPlan] = useState<'monthly' | 'annual'>('annual')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setSuccess(true)
      toast.success('Payment successful')
      setIsLoading(false)
    }, 1000)
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto space-y-6 animate-in-up">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Check className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Payment complete</h2>
            <p className="mt-2 text-muted-foreground">Your receipt and invoice are ready to download.</p>
            <Link to="/dashboard/billing"><Button type="button" className="mt-6">View billing</Button></Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in-up">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Checkout</h1>
        <p className="text-muted-foreground">Subscription purchase and upgrade</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Monthly or annual billing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {plans.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlan(p.id as 'monthly' | 'annual')}
                className={cn(
                  'flex-1 rounded-lg border-2 p-4 text-left transition-all',
                  plan === p.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                )}
              >
                <span className="font-medium">{p.name}</span>
                <p className="mt-1 text-2xl font-semibold">${p.price}<span className="text-sm font-normal text-muted-foreground">/{p.period}</span></p>
                {p.save && <span className="text-xs text-accent">{p.save}</span>}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment
          </CardTitle>
          <CardDescription>Card, billing address, coupon</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card">Card number</Label>
              <Input id="card" placeholder="4242 4242 4242 4242" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exp">Expiry</Label>
                <Input id="exp" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon">Coupon (optional)</Label>
              <Input id="coupon" placeholder="Code" />
            </div>
            <Button type="submit" className="w-full" isLoading={isLoading} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Confirm payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
