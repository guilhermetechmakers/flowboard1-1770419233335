import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Shield,
  Users,
  FolderKanban,
  Bot,
  CreditCard,
  FileText,
  ToggleLeft,
  Download,
  UserPlus,
} from 'lucide-react'
const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
  { id: '2', name: 'Editor', email: 'editor@example.com', role: 'Editor' },
]

export function AdminDashboardPage() {
  const isLoading = false

  return (
    <div className="space-y-8 animate-in-up">
      <div>
        <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">Org controls, billing, compliance, analytics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <span className="text-2xl font-semibold">12</span>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Boards</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <span className="text-2xl font-semibold">8</span>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI credits used</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <span className="text-2xl font-semibold">1.2k</span>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Plan</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-semibold">Pro</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User management
          </CardTitle>
          <CardDescription>Invite, roles, deactivate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Email to invite" className="max-w-xs" />
            <Button type="button">
              <UserPlus className="h-4 w-4" />
              Invite
            </Button>
          </div>
          <div className="rounded-md border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((u) => (
                  <tr key={u.id} className="border-t border-border">
                    <td className="p-3">{u.name}</td>
                    <td className="p-3 text-muted-foreground">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Billing &amp; plans
            </CardTitle>
            <CardDescription>Invoices, upgrade</CardDescription>
          </CardHeader>
          <CardContent>
            <Button type="button" variant="outline">View invoices</Button>
            <Button type="button" className="ml-2">Upgrade</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Security &amp; audit logs
            </CardTitle>
            <CardDescription>Compliance and downloadable reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Button type="button" variant="outline">
              <Download className="h-4 w-4" />
              Download audit log
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ToggleLeft className="h-5 w-5" />
            Feature flags
          </CardTitle>
          <CardDescription>Toggle AI features and integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">AI features: On · Integrations: On</p>
        </CardContent>
      </Card>
    </div>
  )
}
