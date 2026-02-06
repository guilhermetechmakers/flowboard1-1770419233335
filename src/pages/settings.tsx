import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Building2,
  Bot,
  Plug,
  Bell,
  CreditCard,
} from 'lucide-react'

export function SettingsPage() {
  const params = useParams<{ section?: string }>()
  const navigate = useNavigate()
  const settingsSection = params.section ?? 'profile'

  return (
    <div className="space-y-6 animate-in-up">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground">User and organization preferences</p>
      </div>

      <Tabs
        value={settingsSection}
        onValueChange={(v) => {
        if (v === 'billing') navigate('/dashboard/billing')
        else if (v === 'profile') navigate('/dashboard/settings')
        else navigate(`/dashboard/settings/${v}`)
      }}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>Name, avatar, email, password, 2FA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <Button variant="outline">Change password</Button>
              <Button variant="outline">Enable 2FA</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Organization
              </CardTitle>
              <CardDescription>Members, roles, SSO, billing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Manage members and roles.</p>
              <Link to="/dashboard/admin"><Button variant="outline" className="mt-4">Open Admin</Button></Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                AI settings
              </CardTitle>
              <CardDescription>Model selection, credit usage, privacy toggles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Model</Label>
                <Input placeholder="Default model" />
              </div>
              <p className="text-sm text-muted-foreground">AI credits usage and privacy options.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plug className="h-5 w-5" />
                Integrations
              </CardTitle>
              <CardDescription>Google Drive, Notion, Slack, GitHub</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" disabled>Google Drive</Button>
                <Button variant="outline" disabled>Notion</Button>
                <Button variant="outline" disabled>Slack</Button>
                <Button variant="outline" disabled>GitHub</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Email, in-app, webhooks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Configure notification preferences.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing
              </CardTitle>
              <CardDescription>Plans and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/checkout"><Button variant="primary">Upgrade</Button></Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
