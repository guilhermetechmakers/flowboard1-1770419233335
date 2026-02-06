import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Receipt, Download, Bot, CreditCard } from 'lucide-react'

const mockTransactions = [
  { id: '1', date: '2025-02-01', amount: '$12.00', status: 'Paid', invoice: '#' },
  { id: '2', date: '2025-01-01', amount: '$12.00', status: 'Paid', invoice: '#' },
]

export function BillingPage() {
  return (
    <div className="space-y-8 animate-in-up">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Billing</h1>
          <p className="text-muted-foreground">Transactions and AI credit tracking</p>
        </div>
        <Link to="/dashboard/checkout">
          <Button type="button" variant="primary">
            <CreditCard className="h-4 w-4" />
            Upgrade
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI credits usage
          </CardTitle>
          <CardDescription>Usage breakdown for this period</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">1,200 / 5,000 credits used this month.</p>
          <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '24%' }} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Transactions
          </CardTitle>
          <CardDescription>Date, amount, status, invoice link</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((t) => (
                  <tr key={t.id} className="border-t border-border">
                    <td className="p-3">{t.date}</td>
                    <td className="p-3">{t.amount}</td>
                    <td className="p-3">{t.status}</td>
                    <td className="p-3">
                      <a href={t.invoice} className="text-primary hover:underline">Download</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button type="button" variant="outline" className="mt-4">
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
